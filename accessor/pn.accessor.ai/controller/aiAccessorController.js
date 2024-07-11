import express from "express";
import logger from "../utils/logger.js";
import { mostInterestingNews } from "../service/aiService.js";

const aiController = express.Router();

aiController.post('/most-interesting', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { news } = req.body;

        const response = await mostInterestingNews(news);
        
        logger.info(`${req.method}-${req.originalUrl} Returning most interesting news after AI fetch`)

        res.status(200).json({ data: response })
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiController;