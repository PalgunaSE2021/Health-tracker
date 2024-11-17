import { Component } from '@angular/core';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';


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
  ],
})
export class HomeComponent {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchText: string = '';
  selectedWorkoutType: string | null = null;
  itemsPerPage: number = 5;
  page: number = 1;

  workoutTypes = [
    { label: 'All Types', value: null },
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Strength', value: 'Strength' },
    { label: 'Flexibility', value: 'Flexibility' },
  ];

  constructor() {
    this.filteredWorkouts = this.workouts;
    this.loadWorkoutsFromLocalStorage();
  }

  loadWorkoutsFromLocalStorage() {
    const storedData = localStorage.getItem('workouts');
    if (storedData) {
      this.workouts = JSON.parse(storedData);
      this.filteredWorkouts = [...this.workouts];
    }
  }

  saveWorkoutsToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  addWorkoutToTable(workout: any) {
    const existingUser = this.workouts.find(
      (user) => user.userName === workout.userName
    );

    if (existingUser) {
      existingUser.workoutTypes.push(workout.workoutType);
      existingUser.totalWorkouts++;
      existingUser.totalMinutes += workout.workoutDuration;
      existingUser.workoutData.push(workout.workoutDuration);
    } else {
      this.workouts.push({
        userName: workout.userName,
        workoutTypes: [workout.workoutType],
        totalWorkouts: 1,
        totalMinutes: workout.workoutDuration,
        workoutData: [workout.workoutDuration],
      });
    }

    this.filterData();
    this.saveWorkoutsToLocalStorage();
  }

  filterData() {
    let filtered = this.workouts.filter((user) =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.selectedWorkoutType) {
      filtered = filtered.filter((user) =>
        user.workoutTypes.includes(this.selectedWorkoutType)
      );
    }

    this.filteredWorkouts = filtered;
  }

  filterWorkouts() {
    this.filterData();
  }

  onLazyLoad(event: any) {
    this.page = event.first / event.rows + 1;
    this.itemsPerPage = event.rows;
  }

  deleteWorkout(index: number) {
    // Remove the workout from the main list
    this.workouts.splice(index, 1);
    // Update the filtered list
    this.filterData();
    // Save the updated list to localStorage
    this.saveWorkoutsToLocalStorage();
  }
}
