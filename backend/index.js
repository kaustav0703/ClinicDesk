// ****** Importing Dependencies & Database and Defining Port Number  ****** //
import express from 'express';
const port = 8000;
import { connectToDatabase } from "./config/mongoose.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // 👈 must be specific
  credentials: true,               // ✅ allow cookies
}));

// ****** Redirecting Routes ****** //
app.use('/', allRoutes);

// Connect to database
connectToDatabase()
  .then(() => {
    console.log('✅Connected to the database');
    app.listen(port, function (err) {
      if (err) {
        console.log('error');
        return;
      }
      console.log(`Server Running :: Port Number - ${port}`); // ****** Else print this ****** //
    });
  })
  .catch((err) => {
    console.log('❌Failed to connect to the database');
  });