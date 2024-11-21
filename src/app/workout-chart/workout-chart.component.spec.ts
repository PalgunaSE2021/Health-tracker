import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { Workout } from '../models/workout.model';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare chart data correctly when valid workout data is provided', () => {
    const workoutData: Workout = {
      workoutsData: [
        { workoutType: 'Cardio', workoutDuration: 30 },
        { workoutType: 'Strength', workoutDuration: 45 },
        { workoutType: 'Flexibility', workoutDuration: 60 },
      ],
      userName: '',
      workoutDuration: 0,
      workoutsCount: 0,
      workoutTypes: [],
    };

    component.selectedWorkoutForChart = workoutData;
    component.ngOnChanges({
      selectedWorkoutForChart: {
        currentValue: workoutData,
        previousValue: null,
        isFirstChange: () => false, // Provide a function here
        firstChange: false,
      },
    });

    expect(component.workoutData.labels).toEqual([
      'Cardio',
      'Strength',
      'Flexibility',
    ]);
    expect(component.workoutData.datasets[0].data).toEqual([30, 45, 60]);
  });
});
