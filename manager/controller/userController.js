import express from "express";
import logger from "../utils/logger.js";
import axios from "axios"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const userController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });
const serviceAppId = "accessor";


userController.get('/preferences/:id', async (req, res) => {
    try {
        const serviceMethod = `/user/preferences/${req.params.id}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.GET);

        logger.info(`${req.method}-${req.originalUrl}`)

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
userController.post('/add-preferences/:id', async (req, res) => {
    try {
        const pubSubName = "addpreferencepubsub";
        const pubSubTopic = "add-preferences";

        const message = {
            userID: req.params.id,
            preferences:req.body
        };

        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, message);

        logger.info(`${req.method}-${req.originalUrl}`)

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
userController.patch('/update-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const preferences = req.body;
        const serviceMethod = `/user/update-preferences/${userID}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.PATCH, preferences);

        logger.info(`${req.method}-${req.originalUrl}`)

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
userController.delete('/delete-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const { type, preferences } = req.body;
        const typeAndPreference = {
            type: type,
            preferences: preferences
        };
        const serviceMethod = `/user/delete-preferences/${userID}`;

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.DELETE, typeAndPreference);

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(user);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default userController;