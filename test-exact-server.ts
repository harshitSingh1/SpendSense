import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY?.trim(); // testing the exact code
  const ai = new GoogleGenAI({ apiKey });

  const SYSTEM_INSTRUCTION = `You are Stocrates...`;
  
  const chatHistory = [
    { role: "user", parts: [{ text: "hi" }] } // ensuring history is correct
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    console.log("Success:", response.text);
  } catch (error: any) {
    console.log("Error:", error.message);
  }
}
test();
