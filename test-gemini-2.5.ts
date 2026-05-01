import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const ai1 = new GoogleGenAI({ apiKey });
    await ai1.models.generateContent({ model: "gemini-2.5-flash", contents: "hi" });
    console.log("gemini-2.5-flash success");
  } catch(e: any) {
    console.log("gemini-2.5-flash error:", e.message);
  }
}
test();
