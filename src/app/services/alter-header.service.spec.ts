import { TestBed } from '@angular/core/testing';

import { AlterHeaderService } from './alter-header.service';

describe('AlterHeaderService', () => {
  let service: AlterHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
