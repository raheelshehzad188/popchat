import { TestBed } from '@angular/core/testing';

import { MainsevService } from './mainsev.service';

describe('MainsevService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainsevService = TestBed.get(MainsevService);
    expect(service).toBeTruthy();
  });
});
