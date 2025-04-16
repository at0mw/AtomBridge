import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DevHubComponent} from './dev-hub.component';

describe('DevToolsComponent', () => {
  let component: DevHubComponent;
  let fixture: ComponentFixture<DevHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevHubComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
