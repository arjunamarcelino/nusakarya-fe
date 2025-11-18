"use client";

import { useState, useCallback, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getApiClient, createAuthApi, type User } from "@/app/_libs/api";

/**
 * Auto-verify token when authenticated
 * Set to false to disable automatic verification - call verifyToken() manually when needed
 */
const AUTO_VERIFY_ON_CONNECT = true;

/**
 * Auth Hook
 * 
 * Provides authentication state and methods for API integration
 */
export function useAuth() {
  const { authenticated, getAccessToken, ready } = usePrivy();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get API client with Privy token
  const getClient = useCallback(() => {
    return getApiClient(async () => {
      try {
        const token = await getAccessToken();
        return token || null;
      } catch (err) {
        console.error("Failed to get access token:", err);
        return null;
      }
    });
  }, [getAccessToken]);

  // Get auth API instance
  const getAuthApi = useCallback(() => {
    return createAuthApi(getClient());
  }, [getClient]);

  /**
   * Verify token and sync user
   */
  const verifyToken = useCallback(async (): Promise<User | null> => {
    if (!authenticated || !ready) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authApi = getAuthApi();
      const userData = await authApi.verifyToken();
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to verify token";
      setError(errorMessage);
      console.error("Token verification failed:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [authenticated, ready, getAuthApi]);

  /**
   * Get current user
   */
  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    if (!authenticated || !ready) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authApi = getAuthApi();
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to get current user";
      setError(errorMessage);
      console.error("Get current user failed:", err);
      
      // Clear user if unauthorized
      if (err instanceof Error && err.message.includes("401")) {
        setUser(null);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [authenticated, ready, getAuthApi]);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async (): Promise<User | null> => {
    return getCurrentUser();
  }, [getCurrentUser]);

  /**
   * Clear user and error state
   */
  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  // Auto-verify token when authenticated
  useEffect(() => {
    if (ready && authenticated && AUTO_VERIFY_ON_CONNECT) {
      verifyToken();
    } else if (ready && !authenticated) {
      clearUser();
      setIsLoading(false);
    }
  }, [ready, authenticated, verifyToken, clearUser]);

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated: authenticated && user !== null,

    // Methods
    verifyToken,
    getCurrentUser,
    refreshUser,
    clearUser,

    // Utilities
    getClient,
    getAuthApi,
  };
}

