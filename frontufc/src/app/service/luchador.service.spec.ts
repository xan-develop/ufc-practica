import { TestBed } from '@angular/core/testing';

import { LuchadorService } from './luchador.service';

describe('LuchadorService', () => {
  let service: LuchadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuchadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
