import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutTrackerService {
  constructor() {}

  loadWorkouts(): any[] {
    const storedWorkouts = localStorage.getItem('workouts');
    return storedWorkouts ? JSON.parse(storedWorkouts) : [];
  }

  saveWorkouts(workouts: any[]): void {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}
