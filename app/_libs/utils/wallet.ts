"use client";

import { createWalletClient, custom, type WalletClient, type Address, type Chain } from "viem";
import { sepolia } from "viem/chains";
import type { EIP1193Provider } from "viem";

/**
 * Sepolia chain configuration for wallet switching
 */
const SEPOLIA_CHAIN_CONFIG = {
  chainId: "0xaa36a7", // 11155111 in hex
  chainName: "Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
};

/**
 * Switch wallet to Sepolia network
 * 
 * @param provider - EIP-1193 provider
 * @returns Promise that resolves when chain is switched
 */
export async function switchToSepolia(provider: EIP1193Provider): Promise<void> {
  try {
    // Check current chain
    const currentChainId = await provider.request({ method: "eth_chainId" });
    const sepoliaChainId = "0xaa36a7"; // 11155111 in hex

    if (currentChainId === sepoliaChainId) {
      // Already on Sepolia
      return;
    }

    // Try to switch chain
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (switchError) {
      // If chain doesn't exist, add it
      const error = switchError as { code?: number; message?: string };
      if (error.code === 4902 || error.code === -32603) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [SEPOLIA_CHAIN_CONFIG],
        });
      } else {
        throw switchError;
      }
    }
  } catch (error) {
    throw new Error(
      `Failed to switch to Sepolia network: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Get Privy wallet as viem WalletClient
 * 
 * @param provider - EIP-1193 provider from Privy wallet
 * @param chain - Chain to use (default: sepolia)
 * @param accountAddress - Optional account address (for validation only)
 * @returns viem WalletClient instance
 */
export async function getPrivyWalletClient(
  provider: EIP1193Provider,
  chain: Chain = sepolia,
  accountAddress?: Address
): Promise<WalletClient> {
  // Get account from provider
  let providerAccount: Address | undefined;
  try {
    const providerAccounts = await provider.request({ method: 'eth_accounts' });
    if (Array.isArray(providerAccounts) && providerAccounts.length > 0) {
      providerAccount = providerAccounts[0] as Address;
    }
  } catch (error) {
    console.warn("Failed to get accounts from provider:", error);
  }

  // Verify account matches if provided (for debugging)
  if (accountAddress && providerAccount) {
    const accountLower = accountAddress.toLowerCase();
    const providerLower = providerAccount.toLowerCase();
    
    if (accountLower !== providerLower) {
      console.warn(`Provided account ${accountAddress} does not match provider account ${providerAccount}`);
    }
  }

  // Use provider account or fallback to provided account address
  const finalAccount = providerAccount || accountAddress;

  // Create wallet client with account
  // When using custom provider, viem needs the account to be explicitly set
  const walletClient = createWalletClient({
    chain,
    transport: custom(provider),
    account: finalAccount,
  });

  return walletClient;
}

/**
 * Get Privy wallet address from user object
 * 
 * @param user - Privy user object
 * @returns Wallet address or null
 */
export function getWalletAddress(user: { wallet?: { address?: string } } | null): Address | null {
  if (!user?.wallet?.address) {
    return null;
  }
  
  // Validate address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(user.wallet.address)) {
    return null;
  }
  
  return user.wallet.address as Address;
}

