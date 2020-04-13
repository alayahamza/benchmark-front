import {TestBed} from '@angular/core/testing';

import {BenchmarkService} from './benchmark.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BenchmarkService', () => {
  let service: BenchmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BenchmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
