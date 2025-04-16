import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavHamburgerButtonComponent} from './nav-hamburger-button.component';

describe('NavHamburgerButtonComponent', () => {
  let component: NavHamburgerButtonComponent;
  let fixture: ComponentFixture<NavHamburgerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavHamburgerButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavHamburgerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
