import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const preferencesController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const serviceAppId = "pnaccessorpreferences";

preferencesController.get('/preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const serviceMethod = `/user/preferences/${req.params.id}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.GET);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved user`)

        res.status(200).send(user);
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//create/replace preferences
/**
 * input of this type:
 * {
    "newsCategories": ["Football"],
    "techUpdates": ["Samsung"]
    }
*/
preferencesController.post('/create-or-replace-preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const pubSubName = "createorreplacepreferencepubsub";
        const pubSubTopic = "create-or-replace-preferences";

        const message = {
            userID: req.params.id,
            preferences:req.body
        };

        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, message);

        logger.info(`${req.method}-${req.originalUrl}: Successfully created preferences`)

        res.status(200).send("Request to register has been sent :)")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Add preferences
/**
 * input of this type:
 * {
    "newsCategories": ["Football"],
    "techUpdates": ["Samsung"]
    }
*/
preferencesController.patch('/update-preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const userID = req.params.id;
        const preferences = req.body;
        const serviceMethod = `/user/update-preferences/${userID}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.PATCH, preferences);

        logger.info(`${req.method}-${req.originalUrl}: Successfully updated preferences`)

        res.status(200).send(user);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Remove specific preference from news OR tech
/**
 * input of this type:
 * FOR NEWS DELETE
 * {
        "type": "news",
        "preferences": ["sports"]
    }

    FOR TECH DELETE
    {
    "type": "tech",
    "preferences": ["AI"]
    }
*/
preferencesController.delete('/delete-preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const userID = req.params.id;
        const { type, preferences } = req.body;
        const typeAndPreference = {
            type: type,
            preferences: preferences
        };
        const serviceMethod = `/user/delete-preferences/${userID}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.DELETE, typeAndPreference);

        logger.info(`${req.method}-${req.originalUrl}: Successfully deleted prefernces`)

        res.status(200).send(user);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default preferencesController;