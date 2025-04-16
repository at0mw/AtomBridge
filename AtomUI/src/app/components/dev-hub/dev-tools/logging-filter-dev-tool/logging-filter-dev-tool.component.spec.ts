import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingFilterDevToolComponent } from './logging-filter-dev-tool.component';

describe('LoggingFilterDevToolComponent', () => {
  let component: LoggingFilterDevToolComponent;
  let fixture: ComponentFixture<LoggingFilterDevToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggingFilterDevToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggingFilterDevToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
