import express from "express";
import { mostInterestingNews } from "../service/aiService.js";

const aiController = express.Router();

aiController.get('/most-interesting', async (req, res) => {
    try {
        const { news } = req.body;

        const response = await mostInterestingNews(news);

        res.status(200).json({ data: response })
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiController;