import { WorkoutData } from './workout-data.model';

export interface Workout {
  userName: string;
  workoutDuration: number;
  workoutsCount: number;
  workoutTypes: ('Strength' | 'Cardio' | 'Flexibility' | 'All types')[];
  workoutsData: WorkoutData[];
}
