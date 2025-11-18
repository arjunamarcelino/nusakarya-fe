import { type Address, type Abi } from "viem";
import { RevenueAbi } from "./abi/RevenueAbi";
import { NftAbi } from "./abi/NftAbi";
import { LicenseAbi } from "./abi/LicenseAbi";

export const NETWORKS = {
  ETH_SEPOLIA: 11155111,
} as const;

export const CONTRACT_ADDRESSES = {
  [NETWORKS.ETH_SEPOLIA]: {
    REVENUE: (process.env.NEXT_PUBLIC_ADDRESS_AUTHEN_REVENUE) as Address,
    NFT: (process.env.NEXT_PUBLIC_ADDRESS_AUTHEN_NFT) as Address,
    LICENSE: (process.env.NEXT_PUBLIC_ADDRESS_AUTHEN_LICENSE) as Address,
  },
} as const;

// Contract configuration
export interface ContractConfig {
  name: string;
  address: Address;
  chainId: number;
  abi: Abi;
  verified?: boolean;
  description?: string;
}

// Contract configurations
export const CONTRACT_CONFIGS: Record<number, Record<string, ContractConfig>> = {
  [NETWORKS.ETH_SEPOLIA]: {
    REVENUE: {
      name: "Revenue Contract (Ethereum Sepolia)",
      address: CONTRACT_ADDRESSES[NETWORKS.ETH_SEPOLIA].REVENUE,
      chainId: NETWORKS.ETH_SEPOLIA,
      abi: RevenueAbi,
      verified: true,
      description: "Revenue sharing contract on Ethereum Sepolia testnet",
    },
    NFT: {
      name: "NFT Certificate Contract (Ethereum Sepolia)",
      address: CONTRACT_ADDRESSES[NETWORKS.ETH_SEPOLIA].NFT,
      chainId: NETWORKS.ETH_SEPOLIA,
      abi: NftAbi,
      verified: true,
      description: "NFT certificate contract on Ethereum Sepolia testnet",
    },
    LICENSE: {
      name: "License Contract (Ethereum Sepolia)",
      address: CONTRACT_ADDRESSES[NETWORKS.ETH_SEPOLIA].LICENSE,
      chainId: NETWORKS.ETH_SEPOLIA,
      abi: LicenseAbi,
      verified: true,
      description: "License management contract on Ethereum Sepolia testnet",
    },
  },
};

// Helper functions
export const contractConfig = {
  /**
   * Get contract address for a specific network and contract type
   */
  getAddress: (
    networkId: number,
    contractType: "REVENUE" | "NFT" | "LICENSE"
  ): Address | null => {
    const addresses =
      CONTRACT_ADDRESSES[networkId as keyof typeof CONTRACT_ADDRESSES];
    return addresses?.[contractType] || null;
  },
  /**
   * Get contract configuration for a specific network and contract type
   */
  getConfig: (
    networkId: number,
    contractType: "REVENUE" | "NFT" | "LICENSE"
  ): ContractConfig | null => {
    const configs = CONTRACT_CONFIGS[networkId as keyof typeof CONTRACT_CONFIGS];
    return configs?.[contractType] || null;
  },
};

// Environment-specific configuration
export const getContractConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";

  if (environment === "production") {
    return {
      defaultNetwork: NETWORKS.ETH_SEPOLIA,
      supportedNetworks: [NETWORKS.ETH_SEPOLIA],
    };
  } else {
    return {
      defaultNetwork: NETWORKS.ETH_SEPOLIA,
      supportedNetworks: [NETWORKS.ETH_SEPOLIA],
    };
  }
};

// Export default configuration
const defaultConfig = {
  NETWORKS,
  CONTRACT_ADDRESSES,
  CONTRACT_CONFIGS,
  contractConfig,
  getContractConfig,
};

export default defaultConfig;
