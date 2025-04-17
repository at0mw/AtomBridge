import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {WebSocketState} from '@interfaces/communication/websocket-service.interface';
import {WebsocketService} from '@services/communication/websocket.service';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'atom-connection-page',
  imports: [
    Button,
    InputText,
    FormsModule
  ],
  templateUrl: './connection-page.component.html',
  styleUrl: './connection-page.component.scss'
})
export class ConnectionPageComponent implements OnInit {
  private readonly _websocket = inject(WebsocketService);
  websocketConnectionStatus: Signal<WebSocketState> = this._websocket.connectionStatus();
  websocketConnectButtonLabel = computed(() => {
    return this.websocketConnectionStatus() === "OPEN" ? "Disconnect" : "Connect";
  })
  value: string = "";
  lastResponse: any;
  private destroy$: Subject<void> = new Subject();


  ngOnInit(): void {
    this._websocket.onMessage().pipe(takeUntil(this.destroy$)).subscribe(response => {
      console.log(response);
      this.lastResponse = response.data?.toString() ?? "error";
    });
  }

  onWebsocketChangeState(state: boolean) {
    state ? this._websocket.connect() : this._websocket.close();
  }

  onSend() {
    this._websocket.sendMessage({
      jsonrpc: "2.0",
      id: "Test",
      method: "echo",
      params: [
        {"value": this.value}
      ]
    });
    this.value = "";
  }
}
