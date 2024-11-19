import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutComponent } from './add-workout.component';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form fields when resetForm is called', () => {
    component.userName = 'John';
    component.workoutDuration = 60;
    component.selectedWorkoutType = 'Cardio';

    component.resetForm();

    expect(component.userName).toBe('');
    expect(component.workoutDuration).toBeNull();
    expect(component.selectedWorkoutType).toBe('');
  });
});
