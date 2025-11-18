import { PinataSDK } from "pinata";

/**
 * Pinata Helper Functions
 * 
 * This module provides helper functions to interact with Pinata IPFS service.
 * Based on: https://docs.pinata.cloud/quickstart
 */

/**
 * Pinata configuration
 */
export interface PinataConfig {
  pinataJwt: string;
  pinataGateway: string;
}

/**
 * Upload response from Pinata
 */
export interface PinataUploadResponse {
  id: string;
  group_id: string | null;
  name: string;
  cid: string;
  created_at: string;
  size: number;
  number_of_files: number;
  mime_type: string;
  vectorized: boolean;
  network: "public" | "private";
}

/**
 * Initialize Pinata SDK instance
 * 
 * @param config - Pinata configuration (JWT and Gateway)
 * @returns Initialized Pinata SDK instance
 */
export function createPinataClient(config: PinataConfig): PinataSDK {
  if (!config.pinataJwt) {
    throw new Error("PINATA_JWT is required");
  }
  
  if (!config.pinataGateway) {
    throw new Error("PINATA_GATEWAY is required");
  }

  return new PinataSDK({
    pinataJwt: config.pinataJwt,
    pinataGateway: config.pinataGateway,
  });
}

/**
 * Get default Pinata client using environment variables
 * 
 * @returns Initialized Pinata SDK instance
 */
export function getPinataClient(): PinataSDK {
  const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT || process.env.PINATA_JWT;
  const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY || process.env.PINATA_GATEWAY;

  if (!pinataJwt) {
    throw new Error("PINATA_JWT environment variable is not set");
  }

  if (!pinataGateway) {
    throw new Error("PINATA_GATEWAY environment variable is not set");
  }

  return createPinataClient({
    pinataJwt,
    pinataGateway,
  });
}

/**
 * Upload a file to Pinata IPFS
 * 
 * @param file - File object to upload
 * @param network - Network type: "public" or "private" (default: "public")
 * @param config - Optional Pinata configuration. If not provided, uses environment variables
 * @returns Upload response with CID and metadata
 */
export async function uploadFile(
  file: File,
  network: "public" | "private" = "public",
  config?: PinataConfig
): Promise<PinataUploadResponse> {
  const pinata = config ? createPinataClient(config) : getPinataClient();

  try {
    const upload = network === "public" 
      ? await pinata.upload.public.file(file)
      : await pinata.upload.private.file(file);
    return upload as PinataUploadResponse;
  } catch (error) {
    throw new Error(`Failed to upload file to Pinata: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Upload multiple files to Pinata IPFS
 * 
 * @param files - Array of File objects to upload
 * @param network - Network type: "public" or "private" (default: "public")
 * @param config - Optional Pinata configuration. If not provided, uses environment variables
 * @returns Array of upload responses with CIDs and metadata
 */
export async function uploadFiles(
  files: File[],
  network: "public" | "private" = "public",
  config?: PinataConfig
): Promise<PinataUploadResponse[]> {
  const pinata = config ? createPinataClient(config) : getPinataClient();

  try {
    const uploads = await Promise.all(
      files.map((file) => 
        network === "public" 
          ? pinata.upload.public.file(file)
          : pinata.upload.private.file(file)
      )
    );
    return uploads as PinataUploadResponse[];
  } catch (error) {
    throw new Error(`Failed to upload files to Pinata: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Retrieve a file from Pinata Gateway using CID
 * 
 * @param cid - Content Identifier (CID) of the file
 * @param config - Optional Pinata configuration. If not provided, uses environment variables
 * @returns File data as Blob
 */
export async function getFile(
  cid: string,
  config?: PinataConfig
): Promise<Blob> {
  const gatewayUrl = getGatewayUrl(cid, config?.pinataGateway);

  try {
    const response = await fetch(gatewayUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    throw new Error(`Failed to retrieve file from Pinata: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Convert a CID to a full Gateway URL
 * 
 * @param cid - Content Identifier (CID) of the file
 * @param config - Optional Pinata configuration. If not provided, uses environment variables
 * @returns Full URL to access the file via Gateway
 */
export function getFileUrl(
  cid: string,
  config?: PinataConfig
): string {
  return getGatewayUrl(cid, config?.pinataGateway);
}

/**
 * Get a Gateway URL directly (without SDK conversion)
 * 
 * @param cid - Content Identifier (CID) of the file
 * @param gateway - Optional gateway domain. If not provided, uses environment variable
 * @returns Full URL to access the file via Gateway
 */
export function getGatewayUrl(cid: string, gateway?: string): string {
  const gatewayDomain = gateway || process.env.NEXT_PUBLIC_PINATA_GATEWAY || process.env.PINATA_GATEWAY;
  
  if (!gatewayDomain) {
    throw new Error("PINATA_GATEWAY environment variable is not set");
  }

  // Remove protocol if present
  const cleanGateway = gatewayDomain.replace(/^https?:\/\//, "");
  
  return `https://${cleanGateway}/ipfs/${cid}`;
}

/**
 * Upload JSON metadata to Pinata IPFS
 * 
 * @param metadata - JSON object to upload
 * @param filename - Optional filename (default: "metadata.json")
 * @param network - Network type: "public" or "private" (default: "public")
 * @param config - Optional Pinata configuration. If not provided, uses environment variables
 * @returns Upload response with CID and metadata
 */
export async function uploadMetadata(
  metadata: Record<string, unknown>,
  filename: string = "metadata.json",
  network: "public" | "private" = "public",
  config?: PinataConfig
): Promise<PinataUploadResponse> {
  const jsonString = JSON.stringify(metadata, null, 2);
  const file = new File([jsonString], filename, { type: "application/json" });
  
  return uploadFile(file, network, config);
}

