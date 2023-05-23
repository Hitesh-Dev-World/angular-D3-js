import { TestBed } from '@angular/core/testing';

import { UtilitiService } from './utiliti.service';

describe('UtilitiService', () => {
  let service: UtilitiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
