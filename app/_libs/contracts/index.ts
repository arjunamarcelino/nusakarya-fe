import { PublicClient, type Abi, type Address, type Hex, type WalletClient, type TransactionRequest, type Account } from 'viem';
import { getContract } from 'viem';
import { parseEther, formatEther, encodeFunctionData, decodeFunctionResult } from 'viem';

// Types for contract interactions
export interface ContractConfig {
  address: Address;
  abi: Abi;
  chainId?: number;
}

export interface TransactionConfig {
  to: Address;
  data: Hex;
  value?: bigint;
  gasLimit?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  nonce?: number;
}

export interface ContractCallParams {
  functionName: string;
  args?: readonly unknown[];
  value?: bigint;
  account?: Address | Account;
}

export interface ContractReadParams extends ContractCallParams {
  blockNumber?: bigint;
  blockTag?: 'latest' | 'earliest' | 'pending';
}

export interface ContractWriteParams extends ContractCallParams {
  gasLimit?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  nonce?: number;
}

export interface ContractSimulateParams extends ContractWriteParams {
  account?: Address;
}

// Error types
export class ContractError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ContractError';
  }
}

export class TransactionError extends Error {
  constructor(
    message: string,
    public readonly hash?: Hex,
    public readonly receipt?: unknown
  ) {
    super(message);
    this.name = 'TransactionError';
  }
}

/**
 * General Smart Contract Helper Class
 * Provides methods to interact with any smart contract
 */
export class ContractHelper {
  private contract: ReturnType<typeof getContract>;
  private publicClient: PublicClient;
  private walletClient?: WalletClient;

  constructor(
    config: ContractConfig,
    publicClient: PublicClient,
    walletClient?: WalletClient
  ) {
    this.contract = getContract({
      address: config.address,
      abi: config.abi,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });
    this.publicClient = publicClient;
    this.walletClient = walletClient;
  }

  /**
   * Read data from smart contract (view/pure functions)
   */
  async read(params: ContractReadParams) {
    try {
      const result = await this.publicClient.readContract({
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: params.functionName,
        args: params.args || [],
        account: params.account,
        blockNumber: params.blockNumber,
          blockTag: params.blockTag,
      });
      return result;
    } catch (error) {
      throw new ContractError(
        `Failed to read from contract: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
  }

  /**
   * Simulate a contract write operation
   */
  async simulate(params: ContractSimulateParams) {
    try {
      const result = await this.publicClient.simulateContract({
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: params.functionName,
        args: params.args || [],
        account: params.account,
        gas: params.gasLimit,
      });
      return result;
    } catch (error) {
      throw new ContractError(
        `Failed to simulate contract call: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
  }

  /**
   * Write to smart contract (state-changing functions)
   */
  async write(params: ContractWriteParams) {
    if (!this.walletClient) {
      throw new ContractError('Wallet client not available for write operations');
    }
    
    // Use provided account or get from wallet client
    // If account is an Address string, we need to ensure wallet client has it
    let account = params.account || this.walletClient.account;
    
    // If account is still not available, try to get it from the wallet client's transport
    if (!account && this.walletClient.account) {
      account = this.walletClient.account;
    }
    
    if (!account) {
      throw new ContractError('Account is required for write operations. Please ensure your wallet is connected.');
    }
    
    try {
      const hash = await this.walletClient.writeContract({
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: params.functionName,
        args: params.args || [],
        account,
        ...(params.value !== undefined && { value: params.value }),
        ...(params.gasLimit !== undefined && { gas: params.gasLimit }),
        ...(params.gasPrice !== undefined && { gasPrice: params.gasPrice }),
        ...(params.maxFeePerGas !== undefined && { maxFeePerGas: params.maxFeePerGas }),
        ...(params.maxPriorityFeePerGas !== undefined && { maxPriorityFeePerGas: params.maxPriorityFeePerGas }),
        ...(params.nonce !== undefined && { nonce: params.nonce }),
      } as Parameters<typeof this.walletClient.writeContract>[0]);
      return hash;
    } catch (error) {
      throw new ContractError(
        `Failed to write to contract: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
  }

  /**
   * Build transaction request without sending it
   */
  async buildTransaction(params: ContractWriteParams): Promise<TransactionRequest> {
    try {
      const data = encodeFunctionData({
        abi: this.contract.abi,
        functionName: params.functionName,
        args: params.args,
      });

      const transaction: TransactionRequest = {
        to: this.contract.address,
        data,
        value: params.value,
        gas: params.gasLimit,
        maxFeePerGas: params.maxFeePerGas,
        maxPriorityFeePerGas: params.maxPriorityFeePerGas,
        nonce: params.nonce,
      };

      return transaction;
    } catch (error) {
      throw new ContractError(
        `Failed to build transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
  }

  /**
   * Estimate gas for a contract call
   */
  async estimateGas(params: ContractSimulateParams): Promise<bigint> {
    try {
      const gas = await this.publicClient.estimateContractGas({
        address: this.contract.address,
        abi: this.contract.abi,
        functionName: params.functionName,
        args: params.args,
        account: params.account,
      });
      return gas;
    } catch (error) {
      throw new ContractError(
        `Failed to estimate gas: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        error
      );
    }
  }

  /**
   * Get contract address
   */
  getAddress(): Address {
    return this.contract.address;
  }

  /**
   * Get contract ABI
   */
  getAbi(): Abi {
    return this.contract.abi as Abi;
  }
}

/**
 * Utility functions for common contract operations
 */
export const contractUtils = {
  /**
   * Parse ether amount to wei
   */
  parseEther: (amount: string | number): bigint => {
    return parseEther(amount.toString());
  },

  /**
   * Format wei amount to ether
   */
  formatEther: (amount: bigint): string => {
    return formatEther(amount);
  },

  /**
   * Encode function data
   */
  encodeFunctionData: (abi: Abi, functionName: string, args?: readonly unknown[]): Hex => {
    return encodeFunctionData({
      abi,
      functionName,
      args,
    });
  },

  /**
   * Decode function result
   */
  decodeFunctionResult: (abi: Abi, functionName: string, data: Hex) => {
    return decodeFunctionResult({
      abi,
      functionName,
      data,
    });
  },

  /**
   * Validate ethereum address
   */
  isValidAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },

  /**
   * Validate ethereum transaction hash
   */
  isValidTxHash: (hash: string): boolean => {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
  },
};

/**
 * Factory function to create contract helper instance
 */
export function createContractHelper(
  config: ContractConfig,
  publicClient: PublicClient,
  walletClient?: WalletClient
): ContractHelper {
  return new ContractHelper(config, publicClient, walletClient);
}

/**
 * Hook to use contract helper with wagmi
 */
export function useContractHelper(
  config: ContractConfig,
  publicClient: PublicClient,
  walletClient?: WalletClient
): ContractHelper {
  return createContractHelper(config, publicClient, walletClient);
}
