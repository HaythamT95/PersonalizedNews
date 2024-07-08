import express from "express";
import dotenv from "dotenv"
import logger from "../service/logger.js";
import News from "../model/news.js";
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
            for (const _news of response.news) {
                news.push(new News(_news.title, _news.summary));
            }
        }

        for (const category of preferences.techUpdates) {
            const response = await fetchNews(category, earliestPublishedDate);
            for (const _news of response.news) {
                news.push(new News(_news.title, _news.summary));
            }
        }
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).json({ news: news })
    } catch (error) {
        logger.error(`${req.method}-${req.originalUrl}: ${error.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default newsController;