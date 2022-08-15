import { TestBed } from '@angular/core/testing';

import { TvshowsService } from './tvshows.service';

describe('TvshowsService', () => {
  let service: TvshowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
