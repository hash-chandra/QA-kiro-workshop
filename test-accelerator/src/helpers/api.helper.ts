import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  constructor(private ctx: APIRequestContext) {}

  async get(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.ctx.get(endpoint, { params });
  }

  async post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.ctx.post(endpoint, { data });
  }

  async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.ctx.put(endpoint, { data });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.ctx.delete(endpoint);
  }
}
