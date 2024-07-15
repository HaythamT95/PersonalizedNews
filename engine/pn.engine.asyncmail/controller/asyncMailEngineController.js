import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const asyncMailController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const serviceNewsAppId = "pnaccessornews";
const serviceAiAppId = "pnaccessorai";
const serviceMethodNews = `/news/api/news`;
const serviceMethodSummarizedNews = `/ai/most-interesting`;

asyncMailController.post('/async-mail', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { email, preferences } = req.body.data;

        const news = await client.invoker.invoke(serviceNewsAppId, serviceMethodNews, HttpMethod.POST, preferences);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved news`)

        const summarizedNews = await client.invoker.invoke(serviceAiAppId, serviceMethodSummarizedNews, HttpMethod.POST, news);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved summarized news`)

        const pubSubName = "sendmailpubsub";
        const pubSubTopic = "send-mail";

        const message = {
            email: email,
            data: summarizedNews.data
        }

        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, message);

        logger.info(`${req.method}-${req.originalUrl}: Sent to asynchronous request`)

        res.status(200).send("Request to send mail has been transferred :)")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default asyncMailController;