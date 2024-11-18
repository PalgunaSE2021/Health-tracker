import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss'],
})
export class WorkoutChartComponent implements OnInit, OnChanges {
  @Input() selectedWorkoutForChart: Workout | null = null;
  workoutData: any;
  basicOptions: any;

  constructor() {}

  // Method to prepare chart data and chart options
  private prepareChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'white'; // Text color for chart labels
    const textColorSecondary = 'white'; // Secondary text color for chart ticks
    const surfaceBorder = '#082f49'; // Border color for chart grid lines

    this.workoutData = {
      // Mapping workout data to chart labels and data points
      labels: this.selectedWorkoutForChart?.workoutsData.map(
        (workout) => workout.workoutType
      ),
      datasets: [
        {
          label: 'Workout duration',
          data: this.selectedWorkoutForChart?.workoutsData.map(
            (workout) => workout.workoutDuration
          ),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ], // Background colors for the chart bars
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    console.log('this.workoutData:', this.workoutData);

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary, // Sets the color of the y-axis ticks
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary, // Sets the color of the x-axis ticks
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false, // Hides the border of the grid
          },
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['selectedWorkoutForChart'].currentValue) {
      this.prepareChart(); // Prepares the chart data and options if the workout data changes
    }
  }

  ngOnInit(): void {
    this.prepareChart(); // Prepares the chart data and options when the component initializes
  }
}
