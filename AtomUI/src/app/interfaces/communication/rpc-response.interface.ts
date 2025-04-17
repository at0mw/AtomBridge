import { z } from 'zod';

export interface RpcResponse<T = any> {
  jsonrpc: "2.0";
  id: string;
  result?: T;
  error?: RpcError;
}

export interface RpcError {
  code: number;
  message: string;
  data?: any;
}

const RpcErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.any().optional(),
});

export const RpcResponseSchema = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.string(),
  result: z.optional(z.unknown()),
  error: z.optional(RpcErrorSchema),
});
