import {Observable} from "rxjs";
import {RpcRequest} from "@interfaces/communication/rpc-request.interface";
import {RpcResponse} from "@interfaces/communication/rpc-response.interface";
import {Signal} from '@angular/core';

export interface WebsocketServiceInterface {
  connect(url: string): void;
  sendMessage<T extends RpcResponse>(message: RpcRequest): Observable<T>;
  close(): void;
  onMessage(): Observable<RpcResponse>;
  connectionStatus(): Signal<WebSocketState>;
}

export type WebSocketState = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";
