import express from "express";
import logger from "../logger.js";
import axios from "axios"

const mailController = express.Router();

mailController.post('/send-mail/:id', async (req, res) => {
    try {
        const userID = req.params.id;

        const news = await axios.get(`http://localhost:5555/ai-news/news/${userID}`);

        await axios.post(`http://localhost:8080/mail/send-mail/${userID}`, { data: { news: news.data } })

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send("Success")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default mailController;