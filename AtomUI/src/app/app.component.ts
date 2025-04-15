import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _router = inject(Router);
  title = 'AtomUI';

  onNavigateToWeather() {
    this._router.navigate(['/weather'], {skipLocationChange: true});
  }

  onNavigateToHome() {
    this._router.navigate(['/'], {skipLocationChange: true});

  }

  onNavigateToWeatherNonSignal() {
    this._router.navigate(['/weather-non-signal'], {skipLocationChange: true});
  }
}
