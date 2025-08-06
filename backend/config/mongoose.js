import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// ****** Database Connection with Mongoose ****** //
export async function connectToDatabase() {
  console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);
    try {
        mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
  },
});
        console.log('✅ Connected to database');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
}
