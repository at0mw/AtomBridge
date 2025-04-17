import {inject, Injectable} from '@angular/core';
import {WebsocketService} from '@services/communication/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RpcMessageService {
  private readonly websocketService = inject(WebsocketService);

  constructor() {
    this.websocketService.onMessage().subscribe(event => this.validateRpcMessage(event));
  }

  private validateRpcMessage(event: any) {

  }
}
