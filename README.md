This is a Workout Tracker Application built with Angular and PrimeNG. The app allows users to log and track their workouts, filter workout data by user and workout type, and display the data in a dynamic table. It also features localStorage to retain workout data between sessions, ensuring a seamless experience for users.
<img width="941" alt="image" src="https://github.com/user-attachments/assets/f8328079-4d09-4b50-9c74-1b7356ebdf1f">


🎯 Features

Manage workout data:
1. Adding a new workout log: This app provides a dialog to add new workout, where user can enter user name, workout type, and duration and save.
<img width="374" alt="image" src="https://github.com/user-attachments/assets/21c8fcc5-ebe7-4382-8275-99972385a0fa">


2. Display workout data: This app has a table with pagination which shows the workout data that are already added by the user. This is implemented using PrimeNG p-table component. As per assignment requirement, the pagination feature is activated when the number of items exceeds the set threshold (>= 5 items). 
<img width="932" alt="image" src="https://github.com/user-attachments/assets/755fa983-1715-4d1e-a6f9-66f1b81d8c75">


3. Search and Filter:
 - Search by Username: Real-time search based on the string entered by the user.
 - Filter by Workout Type: Dropdown for selecting workout types for filtering workouts by different types (For ex: Cardio, Strength, Flexibility).
<img width="934" alt="image" src="https://github.com/user-attachments/assets/1a424cc9-90de-469f-9b67-e7c8a2ab3d4d">


4. Local Storage: Workout logs added by user is saved in local storage to persist data across sessions.

5. Delete workout: Allows users to delete workouts from the list view which are not needed anymore.

6.Chart: Implemented using PrimeNG's p-chart, provides a visual representation of workout data, enabling users to analyze their selected workout types. 
<img width="886" alt="image" src="https://github.com/user-attachments/assets/65a6bd66-f30d-44d9-8524-270f74634d8e">

Sample test report screenshots:
Components:
<img width="960" alt="test_report_workout_chart_2" src="https://github.com/user-attachments/assets/dbd53fe5-0eae-4e26-834b-5068edfbb639">
<img width="932" alt="test_report_workout_chart" src="https://github.com/user-attachments/assets/f1051014-21d4-41de-8504-9f5be5197629">
<img width="959" alt="test_report_user_selector_component" src="https://github.com/user-attachments/assets/d928445c-c755-47c4-8b02-421c4f9abe1c">
<img width="958" alt="test_report_user_selector_2" src="https://github.com/user-attachments/assets/6d7376ab-a075-4e73-a68e-6a96f6f4050f">

Workout service:
<img width="960" alt="test_report_service" src="https://github.com/user-attachments/assets/7c1f9096-bcb3-4037-9674-c53efe03446e">
<img width="805" alt="test_report_service_2" src="https://github.com/user-attachments/assets/43e5695e-3aea-4031-a893-966850a392b9">

All files (being updated):
<img width="960" alt="test_report_all_files" src="https://github.com/user-attachments/assets/39aa0265-5c91-4540-9554-413e1d7d4662">
<img width="572" alt="test_report_terminal" src="https://github.com/user-attachments/assets/68ad714c-ccc5-4b18-91db-ca61368cd448">


Installation steps:
- Clone the repository: `git clone https://github.com/your-username/workout-tracker-app.git`
- Change current working directory to workout-tracker-app: `cd workout-tracker-app`

Install dependencies:
npm install

Start the development server:
ng serve
The app should start running at http://localhost:4200.
