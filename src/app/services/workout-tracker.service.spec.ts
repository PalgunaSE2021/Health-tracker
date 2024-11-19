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

  it('should return an empty array when no workouts are stored', () => {
    const workouts = service.loadWorkouts();
    expect(workouts).toEqual([]);
  });
});
