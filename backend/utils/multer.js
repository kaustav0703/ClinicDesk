// utils/multer.js or in your controller
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });
