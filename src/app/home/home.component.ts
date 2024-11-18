import { Component, OnInit } from '@angular/core';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { WorkoutTrackerService } from '../services/workout-tracker.service';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';
import { Workout } from '../models/workout.model';
import { WorkoutData } from '../models/workout-data.model';
import { WorkoutType } from '../models/workout-type.model';
import { UserSelectorComponent } from '../user-selector/user-selector.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AddWorkoutComponent,
    TableModule,
    FormsModule,
    DropdownModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
    WorkoutChartComponent,
    UserSelectorComponent,
  ],
  providers: [MessageService, ConfirmationService, WorkoutTrackerService],
})
export class HomeComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchText: string = '';
  selectedWorkoutType: 'Cardio' | 'Strength' | 'Flexibility' | 'All types' =
    'All types';
  itemsPerPage: number = 5;
  page: number = 1;
  userList: string[] = [];

  selectedWorkoutForChart: Workout | null = null;

  workoutTypes: WorkoutType[] = [
    { label: 'All types', value: 'All types' },
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Strength', value: 'Strength' },
    { label: 'Flexibility', value: 'Flexibility' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private workoutTrackerService: WorkoutTrackerService
  ) {
    this.filteredWorkouts = this.workouts;
  }

  loadWorkoutsFromLocalStorage(): void {
    const storedWorkouts = this.workoutTrackerService.loadWorkouts();
    if (storedWorkouts && storedWorkouts.length > 0) {
      this.workouts = storedWorkouts;
      this.filteredWorkouts = [...this.workouts];
      this.userList = this.workouts?.map((workout) => workout.userName);
      this.selectedWorkoutForChart = this.workouts[0];
    }
  }

  saveWorkoutsToLocalStorage(): void {
    this.workoutTrackerService.saveWorkouts(this.workouts);
  }

  addWorkoutToTable(workout: any) {
    const newWorkoutEntry: WorkoutData = {
      workoutType: workout.workoutType,
      workoutDuration: workout.workoutDuration,
    };
    // check if the user already has other workout entries
    const existingWorkoutEntry = this.workouts.find(
      (existingWorkout) =>
        existingWorkout.userName.toLowerCase() ===
        workout.userName.toLowerCase()
    );

    if (existingWorkoutEntry) {
      // Add new workout entry to workoutsData of existing user
      existingWorkoutEntry.workoutsData.push(newWorkoutEntry);
      // Update total workout count and duration for existing user
      existingWorkoutEntry.workoutsCount++;
      existingWorkoutEntry.workoutDuration =
        existingWorkoutEntry.workoutDuration + newWorkoutEntry.workoutDuration;
      // If the existing user has previous entries of same workoutType, we don't need to update it again
      if (
        !existingWorkoutEntry.workoutTypes.includes(newWorkoutEntry.workoutType)
      ) {
        existingWorkoutEntry.workoutTypes.push(newWorkoutEntry.workoutType);
      }
    } else {
      // Frame new workout object for new user
      const newWorkout = {
        userName: workout.userName,
        workoutTypes: [workout.workoutType],
        workoutsCount: 1,
        workoutDuration: workout.workoutDuration,
        workoutsData: [newWorkoutEntry],
      };

      // Add the new workout at the beginning of the array
      this.workouts.unshift(newWorkout);
      // Add user name in user list to show in charts section
      this.userList.unshift(workout.userName);
    }

    // This can be optionally turned off: User experience will be odd if user adds a new workout that does not passes the filter because the added value will not be visible in list view
    this.filterWorkoutData();
    this.saveWorkoutsToLocalStorage();

    this.messageService.add({
      severity: 'success',
      summary: 'Workout Added',
      detail: `${workout.userName}'s workout was successfully added.`,
    });

    // Trigger the popup animation
    this.triggerPopupAnimation();
  }

  triggerPopupAnimation(): void {
    // Add the animation class to the first workout element
    const workoutElements = document.querySelectorAll('.workout-item');
    if (workoutElements.length > 0) {
      const firstElement = workoutElements[0];
      firstElement.classList.add('popup-animation');

      // Remove the animation class after the animation ends
      firstElement.addEventListener('animationend', () => {
        firstElement.classList.remove('popup-animation');
      });
    }
  }

  filterWorkoutData() {
    this.filteredWorkouts = this.workouts;
    // if searchText exists, filter workout data by user name that matches search text first
    if (this.searchText?.length > 0) {
      this.filteredWorkouts = this.workouts.filter((workout) =>
        workout.userName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Filter by workout type only when the workout type is not null or not All types
    if (this.selectedWorkoutType && this.selectedWorkoutType !== 'All types') {
      this.filteredWorkouts = this.filteredWorkouts.filter((workout) =>
        workout.workoutTypes.includes(this.selectedWorkoutType)
      );
    }
  }

  onLazyLoad(event: any) {
    this.page = event.first / event.rows + 1;
    this.itemsPerPage = event.rows;
  }

  deleteWorkout(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this workout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.workouts.splice(index, 1);
        this.filterWorkoutData();
        this.saveWorkoutsToLocalStorage();

        // Show toast message for successful deletion
        this.messageService.add({
          severity: 'error',
          summary: 'Workout Deleted',
          detail: 'The workout was successfully deleted.',
        });
      },
      reject: () => {
        // Optional: Show a toast message for cancellation
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Workout deletion was cancelled.',
        });
      },
    });
  }

  updateSelectedWorkoutForChart(userName: string) {
    this.selectedWorkoutForChart =
      this.workouts.find((workout) => workout.userName === userName) || null;
  }

  ngOnInit(): void {
    this.loadWorkoutsFromLocalStorage();
  }
}
