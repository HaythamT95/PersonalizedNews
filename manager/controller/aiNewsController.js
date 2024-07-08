import express from "express";
import logger from "../logger.js";
import axios from "axios"

const aiNewsController = express.Router();

aiNewsController.get('/news/:id', async (req, res) => {
    try {
        const userID = req.params.id;

        const user = await axios.get(`http://localhost:5555/user/preferences/${userID}`);
        const news = await axios.get(`http://localhost:8080/news/api/news`, { data: { preferences: user.data.user.preferences } })
        const summarizedNews = await axios.get(`http://localhost:8080/ai/most-interesting`, { data: { news: news.data.news } })

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(summarizedNews.data.data)
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiNewsController;