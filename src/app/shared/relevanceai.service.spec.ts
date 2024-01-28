import { TestBed } from '@angular/core/testing';

import { RelevanceaiService } from './relevanceai.service';

describe('RelevanceaiService', () => {
  let service: RelevanceaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelevanceaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
