import type { ApiClient } from "./client";

/**
 * License data structure
 */
export interface License {
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
 * Create License request payload
 */
export interface CreateLicenseRequest {
  karyaId: string;
  type: string;
  price: number;
  duration: number;
  description: string;
  tnc: string;
  txHash?: string;
}

/**
 * Create License response
 */
export interface CreateLicenseResponse {
  license: License;
}

/**
 * Get All Licenses response
 */
export interface GetAllLicensesResponse {
  licenses: License[];
}

/**
 * License API Service
 * 
 * Handles license related API calls
 */
export class LicenseApi {
  constructor(private client: ApiClient) {}

  /**
   * Get all licenses for authenticated user
   * 
   * GET /v1/license
   * Retrieves all licenses for the authenticated user
   */
  async getAllLicenses(): Promise<License[]> {
    const response = await this.client.get<GetAllLicensesResponse>("/license");
    return response.data.licenses;
  }

  /**
   * Create a new license
   * 
   * POST /v1/license
   * Creates a new license for a karya
   */
  async createLicense(data: CreateLicenseRequest): Promise<License> {
    const response = await this.client.post<CreateLicenseResponse>("/license", data);
    return response.data.license;
  }
}

/**
 * Create license API instance
 */
export function createLicenseApi(client: ApiClient): LicenseApi {
  return new LicenseApi(client);
}

