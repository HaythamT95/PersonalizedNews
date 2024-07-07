import express from "express";
import axios from "axios";
import dotenv from "dotenv"
import getCurrentDateMinusTwoDays from "../service/newsService.js";

dotenv.config();
const newsController = express.Router();

newsController.get('/api/news', async (req, res) => {
    const { category } = req.body;
    const earliestPublishedDate = getCurrentDateMinusTwoDays();

    try {
        const response = await axios.get("https://api.apilayer.com/world_news/search-news", {
            headers: {
                'apikey': process.env.NEWS_API,
            },
            params: {
                text: category ? category : '',
                language: 'en',
                'earliest-publish-date': earliestPublishedDate,
                number: '2'
            },
        });

        res.status(200).json({ data: response.data })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default newsController;