import { TestBed } from '@angular/core/testing';

import { OngoingGameCardService } from './ongoing-game-card.service';

describe('OngoingGameCardService', () => {
  let service: OngoingGameCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngoingGameCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
