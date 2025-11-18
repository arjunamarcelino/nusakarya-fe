import type { ApiClient } from "./client";
import type { User, VerifyTokenResponse, GetCurrentUserResponse } from "./types";

/**
 * Auth API Service
 * 
 * Handles authentication-related API calls
 */
export class AuthApi {
  constructor(private client: ApiClient) {}

  /**
   * Verify token and sync user
   * 
   * POST /auth/verify
   * Verifies Privy token and creates/updates user in database
   */
  async verifyToken(): Promise<User> {
    const response = await this.client.post<VerifyTokenResponse>("/auth/verify");
    return response.data.user;
  }

  /**
   * Get current authenticated user
   * 
   * GET /auth/me
   * Returns current authenticated user from database
   */
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<GetCurrentUserResponse>("/auth/me");
    return response.data.user;
  }
}

/**
 * Create auth API instance
 */
export function createAuthApi(client: ApiClient): AuthApi {
  return new AuthApi(client);
}

