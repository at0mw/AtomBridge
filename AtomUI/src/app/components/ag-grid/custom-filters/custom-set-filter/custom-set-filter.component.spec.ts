import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomSetFilterComponent} from './custom-set-filter.component';

describe('RoomDeviceCategoryFilterComponent', () => {
  let component: CustomSetFilterComponent;
  let fixture: ComponentFixture<CustomSetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSetFilterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomSetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
