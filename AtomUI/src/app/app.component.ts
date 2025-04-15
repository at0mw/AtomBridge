import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {WebsocketService} from '@services/websocket.service';
import {WebSocketState} from '@interfaces/communication/websocket-service.interface';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _websocket = inject(WebsocketService);
  title = 'AtomUI';
  websocketConnectionStatus: Observable<WebSocketState> = this._websocket.connectionStatus();

  ngOnInit(): void {
    this._websocket.connect();
  }

  onNavigateToWeather() {
    this._router.navigate(['/weather'], {skipLocationChange: true});
  }

  onNavigateToHome() {
    this._router.navigate(['/'], {skipLocationChange: true});

  }

  onNavigateToWeatherNonSignal() {
    this._router.navigate(['/weather-non-signal'], {skipLocationChange: true});
  }

  onWebsocketChangeState(state: boolean) {
    state ? this._websocket.connect() : this._websocket.close();
  }
}
