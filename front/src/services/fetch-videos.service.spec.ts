import { TestBed } from '@angular/core/testing';

import { FetchVideosService } from './fetch-videos.service';

describe('FetchVideosService', () => {
  let service: FetchVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
