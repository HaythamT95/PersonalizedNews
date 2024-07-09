import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const aiNewsController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const serviceAppId = "accessor";


aiNewsController.get('/news/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const serviceMethodUserPreferences = `/user/preferences/${userID}`;
        const serviceMethodNews = `/news/api/news`;
        const serviceMethodSummarizedNews = `/ai/most-interesting`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethodUserPreferences, HttpMethod.GET);
        //const user = await axios.get(`http://accessor:5555/user/preferences/${userID}`);

        const news = await client.invoker.invoke(serviceAppId, serviceMethodNews, HttpMethod.POST, user.user.preferences);
        // const news = await axios.get(`http://accessor:8080/news/api/news`, { data: { preferences: user.data.user.preferences } })

        const summarizedNews = await client.invoker.invoke(serviceAppId, serviceMethodSummarizedNews, HttpMethod.POST, news);
        // const summarizedNews = await axios.get(`http://accessor:8080/ai/most-interesting`, { data: { news: news.data.news } })

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(summarizedNews.data)
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default aiNewsController;