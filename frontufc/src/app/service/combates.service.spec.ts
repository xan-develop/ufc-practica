import { TestBed } from '@angular/core/testing';

import { CombatesService } from './combates.service';

describe('CombatesService', () => {
  let service: CombatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
