import type { ApiResponse } from "./types";
import { ApiError } from "./types";

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
}

/**
 * API Client
 * 
 * Handles all API requests with authentication and error handling
 */
export class ApiClient {
  private baseUrl: string;
  private getAccessToken?: () => Promise<string | null>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ""); // Remove trailing slash
    this.getAccessToken = config.getAccessToken;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Build full URL from path
   */
  private buildUrl(path: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.baseUrl}${cleanPath}`;
  }

  /**
   * Get authorization headers
   */
  private async getHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Merge custom headers if provided
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(customHeaders)) {
        customHeaders.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, customHeaders);
      }
    }

    // Add authorization token if available
    if (this.getAccessToken) {
      const token = await this.getAccessToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: ApiResponse<T>;

    try {
      if (isJson) {
        data = await response.json();
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        throw new ApiError(
          response.status,
          "PARSING_ERROR",
          `Unexpected response format: ${text}`,
          text
        );
      }
    } catch (error) {
      // If it's already an ApiError, rethrow it
      if (error instanceof ApiError) {
        throw error;
      }
      // Handle JSON parsing errors
      throw new ApiError(
        response.status,
        "PARSING_ERROR",
        `Failed to parse response: ${error instanceof Error ? error.message : String(error)}`,
        null
      );
    }

    // Check if response is successful
    if (!response.ok) {
      const errorCode = data.code || "UNKNOWN_ERROR";
      const errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`;
      
      throw new ApiError(response.status, errorCode, errorMessage, data.data);
    }

    return data;
  }

  /**
   * Make GET request
   */
  async get<T>(path: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(path);
      const headers = await this.getHeaders(customHeaders);

      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      // Handle network errors
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        0,
        "SYSTEM_ERROR",
        `Network error: ${error instanceof Error ? error.message : String(error)}`,
        null
      );
    }
  }

  /**
   * Make POST request
   */
  async post<T>(
    path: string,
    body?: unknown,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(path);
      const headers = await this.getHeaders(customHeaders);

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      // Handle network errors
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        0,
        "SYSTEM_ERROR",
        `Network error: ${error instanceof Error ? error.message : String(error)}`,
        null
      );
    }
  }

  /**
   * Make PUT request
   */
  async put<T>(
    path: string,
    body?: unknown,
    customHeaders?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    const headers = await this.getHeaders(customHeaders);

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Make DELETE request
   */
  async delete<T>(path: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    const headers = await this.getHeaders(customHeaders);

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    return this.handleResponse<T>(response);
  }
}

/**
 * Create API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Get default API client using environment variables
 */
export function getApiClient(getAccessToken?: () => Promise<string | null>): ApiClient {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL environment variable is not set");
  }

  return createApiClient({
    baseUrl,
    getAccessToken,
  });
}

