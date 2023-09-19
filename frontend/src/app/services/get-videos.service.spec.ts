import { TestBed } from '@angular/core/testing';

import { GetVideosService } from './videos.service';

describe('GetVideosService', () => {
  let service: GetVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
