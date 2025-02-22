# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Step 1: Clone the Repository
Clone the repository and navigate into the directory AZAR_EDS.

Step 2: Install Dependencies
Run the following command to install dependencies: npm ci

Step 3: Start the Development Server
npm run dev

Step 4: Login to the Application
The login screen will appear.
Use the following credentials for testing:
Username: azar@gmail.com
Password: eds123
Credentials are mentioned in the top of login form for convenience.

Step 5: Access the Form and PDF Upload Feature
After logging in, the form with a PDF upload option will be displayed.

Step 6: Upload a PDF File
Click the Upload File button to upload a PDF.
The uploaded PDF will appear on the screen.

Step 7: Load Dummy Data
Click the Load Dummy Data button to auto-fill the form with sample data.

Step 8: Submit Button
Click the Submit & New button.
The form data will be stored in local storage.

Step 9: Persistent Data Across Tabs
Open the application URL in another tab.
The stored data will still be visible since it is saved in local storage.

Step 10: Logout and Session Management
Click the Logout button to clear the session.
After logging out, the form page cannot be accessed without logging in again.