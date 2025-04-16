import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepDisplayComponent } from './sleep-display.component';

describe('SleepDisplayComponent', () => {
  let component: SleepDisplayComponent;
  let fixture: ComponentFixture<SleepDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
