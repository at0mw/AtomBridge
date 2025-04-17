import {inject, Injectable} from '@angular/core';
import {WebsocketService} from '@services/communication/websocket.service';
import {RpcResponse, RpcResponseSchema} from '@interfaces/communication/rpc-response.interface';
import {LoggingService} from '@services/logging/logging.service';
import {LogCategory} from '@enums/logging/log-category.enum';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RpcMessageService {
  private readonly logger = inject(LoggingService);
  private readonly websocketService = inject(WebsocketService);

  private rpcMessageSubject = new Subject<RpcResponse>();
  rpcMessage$ = this.rpcMessageSubject.asObservable();

  constructor() {
    this.websocketService.onMessage().subscribe(event => this.validateRpcMessage(event));
  }

  private validateRpcMessage(event: any) {
    try {
      const parsedMessage: RpcResponse = RpcResponseSchema.parse(event);
      this.logger.info("Received message", LogCategory.Websocket, { parsedMessage });
      this.rpcMessageSubject.next(parsedMessage);
    } catch (error) {
      // Silently ignore invalid messages
      this.logger.error("Received message", LogCategory.Websocket, { error });
    }
  }
}
