import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDevToolsComponent } from './settings-dev-tools.component';

describe('SettingsDevToolsComponent', () => {
  let component: SettingsDevToolsComponent;
  let fixture: ComponentFixture<SettingsDevToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDevToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDevToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
