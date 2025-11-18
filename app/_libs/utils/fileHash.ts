/**
 * File Hash Utilities
 * 
 * Functions for calculating file hashes for content verification
 */

/**
 * Calculate SHA-256 hash of a file
 * Returns hash as hex string (0x prefixed for bytes32 compatibility)
 * 
 * @param file - File object to hash
 * @returns Promise resolving to hex string hash (0x prefixed)
 */
export async function calculateFileHash(file: File): Promise<`0x${string}`> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  // Return with 0x prefix for bytes32 compatibility
  return `0x${hashHex}` as `0x${string}`;
}

/**
 * Calculate file hash and return as bytes32 format
 * 
 * @param file - File object to hash
 * @returns Promise resolving to bytes32 hash string
 */
export async function getFileHashBytes32(file: File): Promise<`0x${string}`> {
  return calculateFileHash(file);
}

