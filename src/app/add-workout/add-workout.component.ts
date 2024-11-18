import { Component, EventEmitter, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Workout } from '../models/workout.model';
import { WorkoutType } from '../models/workout-type.model';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CommonModule,
  ],
})
export class AddWorkoutComponent {
  @Output() workoutAdded = new EventEmitter<Partial<Workout>>();  // Emits workout data to parent component

  dialogVisible: boolean = false;
  userName: string = '';
  workoutDuration: number | null = null;
  workoutTypes: WorkoutType[] = [
    { label: 'Cardio', value: 'Cardio' },
    { label: 'Strength', value: 'Strength' },
    { label: 'Flexibility', value: 'Flexibility' },
  ];
  selectedWorkoutType: string = '';

  nameError: boolean = false;
  durationError: boolean = false;
  typeError: boolean = false;

  // Shows the dialog to add a workout
  showDialog() {
    this.dialogVisible = true;
  }

  // Hides the dialog and resets the form and error states
  hideDialog() {
    this.dialogVisible = false;
    this.resetErrors();
    this.resetForm();
  }

  // Resets the form fields to their initial state
  resetForm() {
    this.userName = '';
    this.workoutDuration = null;
    this.selectedWorkoutType = '';
  }

  // Resets all error flags to false
  resetErrors() {
    this.nameError = false;
    this.durationError = false;
    this.typeError = false;
  }

  // Validates the form and emits the workout data if all fields are valid
  addWorkout() {
    this.resetErrors();

    if (!this.userName) {
      this.nameError = true;
    }
    if (!this.workoutDuration) {
      this.durationError = true;
    }
    if (!this.selectedWorkoutType) {
      this.typeError = true;
    }

    if (this.userName && this.workoutDuration && this.selectedWorkoutType) {
      const workout = {
        userName: this.userName,
        workoutDuration: this.workoutDuration,
        workoutType: this.selectedWorkoutType,
      };

      this.workoutAdded.emit(workout);
      this.hideDialog();
    }
  }
}
