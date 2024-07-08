import express from "express";
import logger from "../service/logger.js";
import { mostInterestingNews } from "../service/aiService.js";

const aiController = express.Router();

aiController.get('/most-interesting', async (req, res) => {
    try {
        const { news } = req.body;

        const response = await mostInterestingNews(news);
        
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).json({ data: response })
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiController;