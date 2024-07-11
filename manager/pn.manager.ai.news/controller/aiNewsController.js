import express from "express";
import logger from "../utils/logger.js";
import { DaprClient, HttpMethod } from "@dapr/dapr";

const aiNewsController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const servicePreferencesAppId = "pnaccessorpreferences";
const serviceNewsAppId = "pnaccessornews";
const serviceAiAppId = "pnaccessorai";

aiNewsController.get('/news/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const userID = req.params.id;
        const serviceMethodUserPreferences = `/user/preferences/${userID}`;
        const serviceMethodNews = `/news/api/news`;
        const serviceMethodSummarizedNews = `/ai/most-interesting`;

        const user = await client.invoker.invoke(servicePreferencesAppId, serviceMethodUserPreferences, HttpMethod.GET);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved user preferences`)

        const news = await client.invoker.invoke(serviceNewsAppId, serviceMethodNews, HttpMethod.POST, user.user.preferences);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved news`)

        const summarizedNews = await client.invoker.invoke(serviceAiAppId, serviceMethodSummarizedNews, HttpMethod.POST, news);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved summarized news`)

        res.status(200).send(summarizedNews)
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiNewsController;