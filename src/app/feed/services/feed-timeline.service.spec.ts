import { TestBed } from '@angular/core/testing';

import { FeedTimelineService } from './feed-timeline.service';

describe('FeedTimelineService', () => {
  let service: FeedTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
