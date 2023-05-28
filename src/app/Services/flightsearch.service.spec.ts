import { TestBed } from '@angular/core/testing';

import { FlightsearchService } from './flightsearch.service';

describe('FlightsearchService', () => {
  let service: FlightsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
