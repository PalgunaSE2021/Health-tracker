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

  // Load the workouts from local storage when the component initializes
  loadWorkoutsFromLocalStorage(): void {
    const storedWorkouts = this.workoutTrackerService.loadWorkouts();
    if (storedWorkouts && storedWorkouts.length > 0) {
      this.workouts = storedWorkouts;
      this.filteredWorkouts = [...this.workouts];
      this.userList = this.workouts?.map((workout) => workout.userName);
      this.selectedWorkoutForChart = this.workouts[0];
    }
  }

  // Save the workouts to local storage
  saveWorkoutsToLocalStorage(): void {
    this.workoutTrackerService.saveWorkouts(this.workouts);
  }

  // Adds a new workout to the table
  addWorkoutToTable(workout: any) {
    const newWorkoutEntry: WorkoutData = {
      workoutType: workout.workoutType,
      workoutDuration: workout.workoutDuration,
    };

    // Check if the user already has other workout entries
    const existingWorkoutEntry = this.workouts.find(
      (existingWorkout) =>
        existingWorkout.userName.toLowerCase() ===
        workout.userName.toLowerCase()
    );

    if (existingWorkoutEntry) {
      // Add new workout entry to the existing user's data
      existingWorkoutEntry.workoutsData.push(newWorkoutEntry);
      existingWorkoutEntry.workoutsCount++;
      existingWorkoutEntry.workoutDuration += newWorkoutEntry.workoutDuration;

      // Add new workout type only if not already present
      if (
        !existingWorkoutEntry.workoutTypes.includes(newWorkoutEntry.workoutType)
      ) {
        existingWorkoutEntry.workoutTypes.push(newWorkoutEntry.workoutType);
      }
    } else {
      // Create a new workout entry for a new user
      const newWorkout = {
        userName: workout.userName,
        workoutTypes: [workout.workoutType],
        workoutsCount: 1,
        workoutDuration: workout.workoutDuration,
        workoutsData: [newWorkoutEntry],
      };

      // Add the new workout at the beginning of the array
      this.workouts.unshift(newWorkout);
      this.userList.unshift(workout.userName);
    }

    // Apply the filter and update local storage
    this.filterWorkoutData();
    this.saveWorkoutsToLocalStorage();

    // Show success message
    this.messageService.add({
      severity: 'success',
      summary: 'Workout Added',
      detail: `${workout.userName}'s workout was successfully added.`,
    });

    // Trigger the popup animation
    this.triggerPopupAnimation();
  }

  // Triggers the animation for the popup of newly added workout
  triggerPopupAnimation(): void {
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

  // Filters the workouts based on the search text and selected workout type
  filterWorkoutData() {
    this.filteredWorkouts = this.workouts;

    // Filter by search text if available
    if (this.searchText?.length > 0) {
      this.filteredWorkouts = this.workouts.filter((workout) =>
        workout.userName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Filter by selected workout type if applicable
    if (this.selectedWorkoutType && this.selectedWorkoutType !== 'All types') {
      this.filteredWorkouts = this.filteredWorkouts.filter((workout) =>
        workout.workoutTypes.includes(this.selectedWorkoutType)
      );
    }
  }

  // Handles lazy loading for paginated data
  onLazyLoad(event: any) {
    this.page = event.first / event.rows + 1;
    this.itemsPerPage = event.rows;
  }

  // Confirms deletion of a workout and deletes it from the list
  deleteWorkout(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this workout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.workouts.splice(index, 1); // Remove workout from the array
        this.filterWorkoutData(); // Apply filter again
        this.saveWorkoutsToLocalStorage(); // Update local storage

        // Show deletion success message
        this.messageService.add({
          severity: 'error',
          summary: 'Workout Deleted',
          detail: 'The workout was successfully deleted.',
        });
      },
      reject: () => {
        // Optionally show a cancellation message
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Workout deletion was cancelled.',
        });
      },
    });
  }

  // Updates the selected workout for the chart view
  updateSelectedWorkoutForChart(userName: string) {
    this.selectedWorkoutForChart =
      this.workouts.find((workout) => workout.userName === userName) || null;
  }

  // Lifecycle hook to load workouts when component is initialized
  ngOnInit(): void {
    this.loadWorkoutsFromLocalStorage();
  }
}
