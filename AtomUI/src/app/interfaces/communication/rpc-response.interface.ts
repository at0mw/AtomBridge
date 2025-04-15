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
