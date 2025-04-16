import {Component, inject, Signal} from '@angular/core';
import {Observable} from 'rxjs';
import {WebSocketState} from '@interfaces/communication/websocket-service.interface';
import {WebsocketService} from '@services/communication/websocket.service';
import {AsyncPipe} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'atom-connection-page',
  imports: [
    Button
  ],
  templateUrl: './connection-page.component.html',
  styleUrl: './connection-page.component.scss'
})
export class ConnectionPageComponent {
  private readonly _websocket = inject(WebsocketService);
  websocketConnectionStatus: Signal<WebSocketState> = this._websocket.connectionStatus();


  onWebsocketChangeState(state: boolean) {
    state ? this._websocket.connect() : this._websocket.close();
  }
}
