import {Component, signal} from '@angular/core';

@Component({
  selector: 'atom-sleep-display',
  imports: [],
  templateUrl: './sleep-display.component.html',
  styleUrl: './sleep-display.component.scss'
})
export class SleepDisplayComponent {
  time = signal("");

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  private updateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const dateString = now.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    this.time.set(`${timeString} - ${dateString}`);
  }
}
