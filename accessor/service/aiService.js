import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const summarizedContent = async () => {
    const prompt = "Write a story about a magic backpack."
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

const mostInterestingNews = async () => {
    const prompt = "Write a story about a magic backpack."
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

export { summarizedContent, mostInterestingNews };