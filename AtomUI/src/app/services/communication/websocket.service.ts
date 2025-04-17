import {inject, Injectable, Signal, signal} from '@angular/core';
import {filter, Observable, Subject, take, throwError} from 'rxjs';
import {environment} from "@environments/environment";
import {WebsocketServiceInterface, WebSocketState} from '@interfaces/communication/websocket-service.interface';
import {LoggingService} from '@services/logging/logging.service';
import {LogCategory} from '@enums/logging/log-category.enum';
import {RpcResponse} from '@interfaces/communication/rpc-response.interface';
import {RpcRequest} from '@interfaces/communication/rpc-request.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements WebsocketServiceInterface {
  private readonly logger: LoggingService = inject(LoggingService);

  private socket: WebSocket | null = null;
  private reconnectTimeout: any;
  private reconnectInterval = 5000;
  private url: string = environment.websocket.url;
  private messageSubject = new Subject<any>();
  private connectionState = signal<WebSocketState>("CLOSED");
  private dontAttemptReconnect = false;

  connect() {
    this.logger.info(`Connecting to WebSocket at ${this.url}`,  LogCategory.Websocket);
    this.connectionState.set("CONNECTING");

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.logger.info("WebSocket connection established", LogCategory.Websocket);
      this.connectionState.set("OPEN");
    };

    this.socket.onclose = (event) => {
      this.logger.warn("WebSocket disconnected...", LogCategory.Websocket);
      this.connectionState.set("CLOSED");

      if(!this.dontAttemptReconnect) {
        this.logger.warn("Attempting to reconnect...", LogCategory.Websocket);
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = setTimeout(() => this.reconnect(), this.reconnectInterval);
      }
      this.dontAttemptReconnect = false;
    };

    this.socket.onerror = (error) => {
      this.logger.error("WebSocket error occurred", LogCategory.Websocket);
      this.socket?.close();
    };

    this.socket.onmessage = (event) => {this.messageSubject.next(event);}
  }

  private reconnect() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.logger.info("Reconnecting to WebSocket...", LogCategory.Websocket);
      this.connect();
    }
  }

  sendMessage<T extends RpcResponse>(message: RpcRequest){
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      this.logger.info("Sending Json Message", LogCategory.Websocket, jsonMessage);
      this.socket.send(jsonMessage);
    } else {
      this.logger.error("Cannot send message, WebSocket is not connected", LogCategory.Websocket);
      return throwError(() => new Error("WebSocket not connected"));
    }

    return this.onMessage().pipe(
      filter((response: T) => response.id === message.id),
      take(1)
    );
  }

  close(): void {
    this.dontAttemptReconnect = true;
    this.socket?.close();
  }

  onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  connectionStatus(): Signal<WebSocketState> {
    return this.connectionState;
  }
}
