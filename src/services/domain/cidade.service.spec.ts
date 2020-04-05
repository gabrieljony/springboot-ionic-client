import { TestBed } from '@angular/core/testing';

import { CidadeService } from './cidade.service';

describe('CidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CidadeService = TestBed.get(CidadeService);
    expect(service).toBeTruthy();
  });
});
