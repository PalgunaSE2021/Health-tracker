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

  private prepareChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'white';
    const textColorSecondary = 'white';
    const surfaceBorder = '#082f49';
    // const textColor = documentStyle.getPropertyValue('--text-color');
    // const textColorSecondary = documentStyle.getPropertyValue(
    //   '--text-color-secondary'
    // );
    // const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.workoutData = {
      // labels: ['Q1', 'Q2'],
      // data: [100, 500],
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
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['selectedWorkoutForChart'].currentValue) {
      this.prepareChart();
    }
  }

  ngOnInit(): void {
    this.prepareChart();
  }
}
