import { TestBed } from '@angular/core/testing';

import { WorkoutTrackerService } from './workout-tracker.service';

describe('WorkoutTrackerService', () => {
  let service: WorkoutTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
