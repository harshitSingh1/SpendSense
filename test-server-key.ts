import dotenv from "dotenv";
dotenv.config();
console.log("ENV Key:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 15) : "undefined");
