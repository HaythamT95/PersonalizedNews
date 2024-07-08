import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const mostInterestingNews = async (news) => {
    let prompt = "I will give you a list news in content of title and text, please pick the most interesting ones (at least 2) and return then in format of title, and text and format them to send this info into email, for example: Title: Euro winner. Content: ...";
    
    for(const _news of news){
        prompt+=_news._title + '\n';
        prompt+=_news._content + '\n';
    }
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

export { mostInterestingNews };