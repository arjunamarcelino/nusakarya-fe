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
 * Karya API Service
 * 
 * Handles karya (work) related API calls
 */
export class KaryaApi {
  constructor(private client: ApiClient) {}

  /**
   * Get all karya for authenticated user
   * 
   * GET /v1/karya
   * Retrieves all karya for the authenticated user
   */
  async getAllKarya(): Promise<Karya[]> {
    const response = await this.client.get<GetAllKaryaResponse>("/karya");
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

