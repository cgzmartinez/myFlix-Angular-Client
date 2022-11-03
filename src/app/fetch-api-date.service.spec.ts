import { TestBed } from '@angular/core/testing';

import { FetchApiDateService } from './fetch-api-date.service';

describe('FetchApiDateService', () => {
  let service: FetchApiDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
