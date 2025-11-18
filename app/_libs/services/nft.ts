"use client";

import { type Address, type Hex, createPublicClient, http, type Chain } from "viem";
import { sepolia } from "viem/chains";
import { ContractHelper, type ContractConfig } from "../contracts";
import { NftAbi } from "../contracts/abi/NftAbi";
import { contractConfig, NETWORKS } from "../contracts/config";
import { getPrivyWalletClient } from "../utils/wallet";
import type { EIP1193Provider } from "viem";

/**
 * Maximum royalty basis points (10000 = 100%)
 */
export const MAX_ROYALTY_BPS = BigInt(10000);

/**
 * Mint certificate parameters
 */
export interface MintCertificateParams {
  owner: Address;
  uri: string;
  fileHash: Hex;
  royaltyRecipient: Address;
  royaltyBps: bigint;
}

/**
 * Mint certificate result
 */
export interface MintCertificateResult {
  transactionHash: Hex;
  blockNumber: bigint;
  tokenId?: bigint;
}

/**
 * NFT Service
 * 
 * Handles NFT certificate minting operations
 */
export class NftService {
  private contractHelper: ContractHelper;
  private chainId: number;
  private walletProvider?: EIP1193Provider;
  private accountAddress?: Address;
  private chain: Chain;

  constructor(
    contractAddress: Address,
    chainId: number,
    walletProvider?: EIP1193Provider,
    accountAddress?: Address
  ) {
    this.chainId = chainId;
    
    // Get chain configuration
    this.chain = chainId === NETWORKS.ETH_SEPOLIA ? sepolia : sepolia;
    
    // Create public client
    const publicClient = createPublicClient({
      chain: this.chain,
      transport: http(),
    });

    // Store provider and account for later use (wallet client created async)
    this.walletProvider = walletProvider;
    this.accountAddress = accountAddress;

    // Create contract helper (wallet client will be added later)
    const config: ContractConfig = {
      address: contractAddress,
      abi: NftAbi,
      chainId,
    };

    this.contractHelper = new ContractHelper(config, publicClient, undefined);
  }

  /**
   * Mint NFT certificate
   * 
   * @param params - Mint certificate parameters
   * @returns Transaction hash and block number
   */
  async mintCertificate(params: MintCertificateParams): Promise<MintCertificateResult> {
    // Validate royalty BPS (max 10000 = 100%)
    if (params.royaltyBps > MAX_ROYALTY_BPS) {
      throw new Error(`Royalty BPS cannot exceed ${MAX_ROYALTY_BPS} (100%)`);
    }

    // Validate that royalty recipient is the owner (as per requirement)
    if (params.royaltyRecipient.toLowerCase() !== params.owner.toLowerCase()) {
      throw new Error("Royalty recipient must be the owner");
    }

    try {
      // Switch to correct chain if provider is available
      if (this.walletProvider) {
        // Import switchToSepolia dynamically to avoid circular dependencies
        const { switchToSepolia } = await import("../utils/wallet");
        try {
          await switchToSepolia(this.walletProvider);
        } catch (chainError) {
          throw new Error(
            `Please switch your wallet to Sepolia testnet. ${chainError instanceof Error ? chainError.message : "Network switch required"}`
          );
        }
      }

      // Create wallet client if provider is available
      if (this.walletProvider && !this.contractHelper["walletClient"]) {
        const walletClient = await getPrivyWalletClient(
          this.walletProvider,
          this.chain,
          this.accountAddress || params.owner
        );
        // Update contract helper with wallet client
        this.contractHelper["walletClient"] = walletClient;
      }

      // Call mintCertificate function
      // Account is already set in wallet client, so we don't need to pass it explicitly
      const hash = await this.contractHelper.write({
        functionName: "mintCertificate",
        args: [
          {
            owner: params.owner,
            uri: params.uri,
            fileHash: params.fileHash,
            royaltyRecipient: params.royaltyRecipient,
            royaltyBps: params.royaltyBps,
          },
        ],
      });

      // Wait for transaction receipt
      const publicClient = this.contractHelper["publicClient"];
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Extract token ID by reading from contract
      // The contract's tokenId() function returns the current token ID (which is the newly minted one)
      let tokenId: bigint | undefined;
      try {
        tokenId = (await this.contractHelper.read({
          functionName: "tokenId",
          args: [],
        })) as bigint;
      } catch (error) {
        console.warn("Failed to read token ID from contract:", error);
        // Continue without token ID - it can be retrieved later
      }

      return {
        transactionHash: hash,
        blockNumber: receipt.blockNumber,
        tokenId,
      };
    } catch (error) {
      throw new Error(
        `Failed to mint certificate: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Get contract address
   */
  getAddress(): Address {
    return this.contractHelper.getAddress();
  }
}

/**
 * Create NFT service instance
 * 
 * @param chainId - Chain ID
 * @param walletProvider - Optional Privy wallet provider
 * @returns NFT service instance
 */
export function createNftService(
  chainId: number = NETWORKS.ETH_SEPOLIA,
  walletProvider?: EIP1193Provider,
  accountAddress?: Address
): NftService {
  const contractAddress = contractConfig.getAddress(chainId, "NFT");
  
  if (!contractAddress) {
    throw new Error(`NFT contract address not found for chain ${chainId}`);
  }

  return new NftService(contractAddress, chainId, walletProvider, accountAddress);
}

