export interface RpcRequest {
  jsonrpc: string;
  id: string;
  method: string;
  params: any[];
}
