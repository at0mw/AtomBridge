import {Component, inject, OnInit, Signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {WebsocketService} from '@services/communication/websocket.service';
import {WebSocketState} from '@interfaces/communication/websocket-service.interface';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DevHubComponent} from '@components/dev-hub/dev-hub.component';
import {HeaderBarComponent} from '@components/core/header-bar/header-bar.component';
import {SideMenuComponent} from '@components/core/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevHubComponent, HeaderBarComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _websocket = inject(WebsocketService);
  title = 'AtomUI';

  ngOnInit(): void {
    this._websocket.connect();
  }
}
