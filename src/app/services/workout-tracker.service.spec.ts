import { TestBed } from '@angular/core/testing';
import { WorkoutTrackerService } from './workout-tracker.service';

describe('WorkoutTrackerService', () => {
  let service: WorkoutTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutTrackerService);
    spyOn(localStorage, 'getItem').and.callThrough();
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadWorkouts', () => {
    it('should return an empty array if no workouts are stored in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const workouts = service.loadWorkouts();
      expect(localStorage.getItem).toHaveBeenCalledWith('workouts');
      expect(workouts).toEqual([]);
    });

    it('should return parsed workouts if stored in localStorage', () => {
      const mockWorkouts = JSON.stringify([
        { userName: 'John Doe', workoutDuration: 120, workoutsCount: 2 },
      ]);
      (localStorage.getItem as jasmine.Spy).and.returnValue(mockWorkouts);

      const workouts = service.loadWorkouts();
      expect(localStorage.getItem).toHaveBeenCalledWith('workouts');
      expect(workouts).toEqual([
        { userName: 'John Doe', workoutDuration: 120, workoutsCount: 2 },
      ]);
    });
  });

  describe('saveWorkouts', () => {
    it('should save workouts to localStorage', () => {
      const mockWorkouts = [
        { userName: 'Jane Doe', workoutDuration: 90, workoutsCount: 1 },
      ];

      service.saveWorkouts(mockWorkouts);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'workouts',
        JSON.stringify(mockWorkouts)
      );
    });
  });
});
