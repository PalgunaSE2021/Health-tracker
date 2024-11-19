This is a Workout Tracker Application built with Angular and PrimeNG. The app allows users to log and track their workouts, filter workout data by user and workout type, and display the data in a dynamic table. It also features localStorage to retain workout data between sessions, ensuring a seamless experience for users.
<img width="941" alt="image" src="https://github.com/user-attachments/assets/f8328079-4d09-4b50-9c74-1b7356ebdf1f">


🎯 Features

Manage workout data:
1. Adding a new workout log: This app provides a dialog to add new workout, where user can enter user name, workout type, and duration and save.
<img width="374" alt="image" src="https://github.com/user-attachments/assets/21c8fcc5-ebe7-4382-8275-99972385a0fa">


3. Display workout data: This app has a table with pagination which shows the workout data that are already added by the user. This is implemented using PrimeNG p-table component. As per assignment requirement, the pagination feature is activated when the number of items exceeds the set threshold (>= 5 items). 
<img width="932" alt="image" src="https://github.com/user-attachments/assets/755fa983-1715-4d1e-a6f9-66f1b81d8c75">


4. Search and Filter:
 - Search by Username: Real-time search based on the string entered by the user.
 - Filter by Workout Type: Dropdown for selecting workout types for filtering workouts by different types (For ex: Cardio, Strength, Flexibility).

4. Local Storage: Workout logs added by user is saved in local storage to persist data across sessions.

5. Delete workout: Allows users to delete workouts from the list view which are not needed anymore.

Installation steps:
- Clone the repository: `git clone https://github.com/your-username/workout-tracker-app.git`
- Change current working directory to workout-tracker-app: `cd workout-tracker-app`

Install dependencies:
npm install

Start the development server:
ng serve
The app should start running at http://localhost:4200.
