import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPageComponent } from './weather-page.component';
import {HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPageComponent, HttpClientTestingModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
