import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const mailController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const serviceAppIdManager = "manager";

mailController.post('/send-mail/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const { email } = req.body;
        const serviceMethodNews = `/ai-news/news/${userID}`;

        const news = await client.invoker.invoke(serviceAppIdManager, serviceMethodNews, HttpMethod.GET);

        const pubSubName = "sendmailpubsub";
        const pubSubTopic = "send-mail";

        const message = {
            email: email,
            data: news.data
        }

        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, message);

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send("Request to send mail has been sent :)")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default mailController;