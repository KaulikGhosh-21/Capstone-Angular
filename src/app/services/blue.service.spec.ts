import { TestBed } from '@angular/core/testing';

import { BlueService } from './blue.service';

describe('BlueService', () => {
  let service: BlueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
