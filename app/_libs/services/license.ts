"use client";

import { type Address, type Hex, createPublicClient, http, type Chain } from "viem";
import { sepolia } from "viem/chains";
import { ContractHelper, type ContractConfig } from "../contracts";
import { LicenseAbi } from "../contracts/abi/LicenseAbi";
import { contractConfig, NETWORKS } from "../contracts/config";
import { getPrivyWalletClient } from "../utils/wallet";
import type { EIP1193Provider } from "viem";

/**
 * Mint license parameters
 */
export interface MintLicenseParams {
  to: Address;
  certificateId: bigint;
  expiry: bigint;
  usageType: 0 | 1; // 0 = commercial, 1 = other
  amount: bigint;
}

/**
 * Mint license result
 */
export interface MintLicenseResult {
  transactionHash: Hex;
  blockNumber: bigint;
}

/**
 * License Service
 * 
 * Handles license minting operations
 */
export class LicenseService {
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
      abi: LicenseAbi,
      chainId,
    };

    this.contractHelper = new ContractHelper(config, publicClient, undefined);
  }

  /**
   * Mint license
   * 
   * @param params - Mint license parameters
   * @returns Transaction hash and block number
   */
  async mintLicense(params: MintLicenseParams): Promise<MintLicenseResult> {
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
          this.accountAddress || params.to
        );
        // Update contract helper with wallet client
        this.contractHelper["walletClient"] = walletClient;
      }

      // Call mintLicense function
      const hash = await this.contractHelper.write({
        functionName: "mintLicense",
        args: [
          {
            to: params.to,
            certificateId: params.certificateId,
            expiry: params.expiry,
            usageType: params.usageType,
          },
          params.amount,
        ],
      });

      // Wait for transaction receipt
      const publicClient = this.contractHelper["publicClient"];
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return {
        transactionHash: hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      throw new Error(
        `Failed to mint license: ${error instanceof Error ? error.message : "Unknown error"}`
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
 * Create License service instance
 * 
 * @param chainId - Chain ID
 * @param walletProvider - Optional Privy wallet provider
 * @returns License service instance
 */
export function createLicenseService(
  chainId: number = NETWORKS.ETH_SEPOLIA,
  walletProvider?: EIP1193Provider,
  accountAddress?: Address
): LicenseService {
  const contractAddress = contractConfig.getAddress(chainId, "LICENSE");
  
  if (!contractAddress) {
    throw new Error(`License contract address not found for chain ${chainId}`);
  }

  return new LicenseService(contractAddress, chainId, walletProvider, accountAddress);
}

