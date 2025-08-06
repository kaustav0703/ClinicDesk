Hospital API
This is a Node.js and MongoDB-based API for managing doctors and patients at a hospital allocated by the government for COVID-19 testing, quarantine, and patient well-being. The API allows doctors to register, log in, create patient reports, and retrieve patient information. Patients can register and view their reports. The API includes authentication for certain routes and follows a scalable folder structure.

Tech Stack
Node.js
MongoDB
Express.js
JSON Web Tokens (JWT)
Folder Structure
The project follows a scalable folder structure to keep code organized:

Setting Up the Project Locally
Follow these steps to set up the project on your local system:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd hospital-api
Install Dependencies:

Copy code
npm install
Configure Environment Variables:
Create a .env file in the project root and add the following variables:

makefile
Copy code
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Start the Server:

sql
Copy code
npm start
Testing the API:
You can use a tool like Postman to test the API endpoints. Import the provided Postman collection for convenient testing.

API Endpoints
Doctors
POST /doctors/register: Register a new doctor with username and password.
POST /doctors/login: Log in as a doctor and get a JWT.
Patients
POST /patients/register: Register a new patient.
POST /patients/:id/create_report: Create a patient report by a doctor.
GET /patients/:id/all_reports: List all reports of a patient (oldest to latest).
Reports
GET /reports/:status: List all reports of all patients filtered by a specific status.
Authentication
Authentication using JWT is required for the following routes:

/patients/:id/all_reports
/patients/:id/create_report

Please note that the MongoDB URI and JWT secret should be kept secure in production environments and should not be exposed in your public repository or videos.
