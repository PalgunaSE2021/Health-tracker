import { test, expect } from '@playwright/test';

test.describe('Add Workout', () => {
  test('should add a new workout', async ({ page }) => {
    await page.goto('https://my-fitness-tracker.netlify.app/'); 
    // Click on the "Add Workout" button
    await page.click('text=Add Workout');

    // Ensure the form is visible before filling
    const formVisible = await page.isVisible('form#add-workout-form');
    if (!formVisible) {
      console.error('Form not found or not visible');
    }

    // Fill in the form fields
    await page.fill('input[id="userName"]', 'Palguna');
    await page.fill('input[id="workoutDuration"]', '30');

    // If there is a dropdown for workout type, you may need to select an option

    await page.click('#workoutType');
    await page.waitForSelector('.p-dropdown-panel');

    // Select the option "Cardio" from the dropdown
    await page.click('.p-dropdown-item:has-text("Cardio")');

    // Click the "Add" button inside the dialog
    await page.click('p-dialog button.p-button-primary:has-text("Add")');

    await page.waitForSelector('text=Palguna'); 

    const workoutExists = await page.isVisible('text=Palguna');
    expect(workoutExists).toBeTruthy();
  });
});
