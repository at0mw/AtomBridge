import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParagraphCellComponent} from './paragraph-cell.component';

describe('ParagraphCellComponent', () => {
  let component: ParagraphCellComponent;
  let fixture: ComponentFixture<ParagraphCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParagraphCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParagraphCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
