import type { ApiClient } from "./client";

/**
 * Karya (Work) data structure
 */
export interface Karya {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  tag: string[];
  fileUrl: string;
  fileHash: string;
  nftId: string;
  txHash: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Karya request payload
 */
export interface CreateKaryaRequest {
  title: string;
  description: string;
  type: string;
  category?: string;
  tag?: string[];
  fileUrl: string;
  fileHash: string;
  nftId: string;
  txHash: string;
}

/**
 * Create Karya response
 */
export interface CreateKaryaResponse {
  karya: Karya;
}

/**
 * Get All Karya response
 */
export interface GetAllKaryaResponse {
  karya: Karya[];
}

/**
 * Verify Karya request payload
 */
export interface VerifyKaryaRequest {
  hash: string;
}

/**
 * User data structure (from verify response)
 */
export interface KaryaUser {
  id: string;
  privyId: string;
  walletAddress: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * License data structure (from verify response)
 */
export interface KaryaLicense {
  id: string;
  karyaId: string;
  userId: string;
  type: string;
  price: number;
  duration: number;
  description: string;
  tnc: string;
  txHash: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Karya with user and licenses (from verify response)
 */
export interface KaryaWithDetails extends Karya {
  user: KaryaUser;
  licenses: KaryaLicense[];
}

/**
 * Verify Karya response
 */
export interface VerifyKaryaResponse {
  karya: KaryaWithDetails;
}

/**
 * Karya API Service
 * 
 * Handles karya (work) related API calls
 */
export class KaryaApi {
  constructor(private client: ApiClient) {}

  /**
   * Get all karya for authenticated user
   * 
   * GET /karya
   * Retrieves all karya for the authenticated user
   */
  async getAllKarya(): Promise<Karya[]> {
    const response = await this.client.get<GetAllKaryaResponse>("/karya");
    return response.data.karya;
  }

  /**
   * Verify karya by hash
   * 
   * POST /v1/karya/verify
   * Public endpoint - no authentication required
   * Verifies if a karya exists by file hash
   */
  async verifyKarya(hash: string): Promise<KaryaWithDetails> {
    const response = await this.client.post<VerifyKaryaResponse>("/karya/verify", { hash });
    return response.data.karya;
  }

  /**
   * Create a new karya
   * 
   * POST /karya
   * Creates a new karya record in the database
   */
  async createKarya(data: CreateKaryaRequest): Promise<Karya> {
    const response = await this.client.post<CreateKaryaResponse>("/karya", data);
    return response.data.karya;
  }
}

/**
 * Create karya API instance
 */
export function createKaryaApi(client: ApiClient): KaryaApi {
  return new KaryaApi(client);
}

