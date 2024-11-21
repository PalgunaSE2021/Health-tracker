import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
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
export class WorkoutChartComponent implements OnChanges {
  @Input() selectedWorkoutForChart: Workout | null = null;
  workoutData: any;
  basicOptions: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  // Method to prepare chart data and chart options
  private prepareChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'white';
    const textColorSecondary = 'white';
    const surfaceBorder = '#082f49';

    if (!this.selectedWorkoutForChart?.workoutsData) {
      return; // Avoid errors if data is null or empty
    }

    this.workoutData = {
      labels: this.selectedWorkoutForChart.workoutsData.map(
        (workout) => workout.workoutType
      ),
      datasets: [
        {
          label: 'Workout Duration',
          data: this.selectedWorkoutForChart.workoutsData.map(
            (workout) => workout.workoutDuration
          ),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
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

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 16,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    // Trigger change detection to ensure chart updates immediately
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWorkoutForChart'] && this.selectedWorkoutForChart) {
      // When selectedWorkoutForChart changes, update the chart data
      this.prepareChart();
    }
  }

  ngOnInit(): void {
    this.prepareChart(); // Prepares the chart data and options when the component initializes
  }
}
