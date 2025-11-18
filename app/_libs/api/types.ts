/**
 * API Types and Interfaces
 * 
 * Type definitions for the API integration
 */

/**
 * Standard API response structure
 */
export interface ApiResponse<T = unknown> {
  status: number;
  code: string | null;
  message: string | null;
  data: T;
}

/**
 * User data structure
 * Matches backend AuthenticatedRequest.user
 */
export interface User {
  id: string;
  privyId: string;
  walletAddress?: string;
  email?: string;
}

/**
 * Auth API responses
 */
export interface VerifyTokenResponse {
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

/**
 * API Error codes
 */
export enum ApiErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  SYSTEM_ERROR = "SYSTEM_ERROR",
  PARSING_ERROR = "PARSING_ERROR",
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ApiErrorCode | string | null,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

