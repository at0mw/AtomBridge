import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherNonSignalPageComponent } from './weather-non-signal-page.component';

describe('WeatherNonSignalPageComponent', () => {
  let component: WeatherNonSignalPageComponent;
  let fixture: ComponentFixture<WeatherNonSignalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherNonSignalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherNonSignalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
