import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDevToolsComponent } from './logs-dev-tools.component';

describe('LogsDevToolsComponent', () => {
  let component: LogsDevToolsComponent;
  let fixture: ComponentFixture<LogsDevToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsDevToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDevToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
