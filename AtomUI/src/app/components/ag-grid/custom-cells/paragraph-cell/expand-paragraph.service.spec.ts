import {TestBed} from '@angular/core/testing';

import {ExpandParagraphService} from './expand-paragraph.service';

describe('ExpandParagraphService', () => {
  let service: ExpandParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpandParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
