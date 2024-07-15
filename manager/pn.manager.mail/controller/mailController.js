import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"

const mailController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";

mailController.post('/send-mail', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { email, preferences } = req.body;

        const pubSubName = "asyncmailpubsub";
        const pubSubTopic = "async-mail";

        const message = {
            email: email,
            preferences: preferences
        }

        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, message);

        logger.info(`${req.method}-${req.originalUrl}: Sent to asynchronous request`)

        res.status(200).send("Request to send mail has been sent :)")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default mailController;