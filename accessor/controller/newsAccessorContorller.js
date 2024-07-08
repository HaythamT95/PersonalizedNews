import express from "express";
import dotenv from "dotenv"
import { getCurrentDateMinusTwoDays, fetchNews } from "../service/newsService.js";

dotenv.config();
const newsController = express.Router();

newsController.get('/api/news', async (req, res) => {
    const { preferences } = req.body;
    const earliestPublishedDate = getCurrentDateMinusTwoDays();

    let news = [];

    try {
        for (const category of preferences.newsCategories) {
            const response = await fetchNews(category, earliestPublishedDate);
            console.log(response)
        }

        for (const category of preferences.techUpdates) {
            const response = await fetchNews(category, earliestPublishedDate);
            console.log(response)

        }

        res.status(200).json({ data: "success" })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default newsController;