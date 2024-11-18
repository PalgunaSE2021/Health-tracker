This is a Workout Tracker Application built with Angular and PrimeNG. The app allows users to log and track their workouts, filter workout data by user and workout type, and display the data in a dynamic table. It also features local storage to retain workout data between sessions, ensuring a seamless experience for users.

🎯 Features
Add Workout: A form modal to add new workouts, including user name, workout type, and duration.

Local Storage: Automatically saves workouts to local storage to persist data across sessions.

Dynamic Table: Displays a paginated and filterable table of workouts using PrimeNG's p-table component.

Search and Filter:
Search by Username: Real-time filtering based on the entered username.

Filter by Workout Type: Dropdown selection for filtering workouts by type (Cardio, Strength, Flexibility).

Responsive Design: Mobile-friendly layout with adaptive components.

Error Handling: Inline error messages for form validation.

Delete Functionality: Allows users to delete workouts from the list.

Pagination: The project uses PrimeNG's p-table component with pagination to efficiently display large workout data sets. The pagination feature is activated when the number of items exceeds the set threshold (>= 5 items). 

Installation
Clone the repository:
git clone https://github.com/your-username/workout-tracker-app.git
cd workout-tracker-app

Install dependencies:
npm install

Start the development server:
ng serve
The app will be available at http://localhost:4200.
