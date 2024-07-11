import express from "express";
import axios from "axios"
import logger from "../utils/logger.js"
import { DaprClient, HttpMethod } from "@dapr/dapr";

const authController = express.Router();

const daprHost = "http://localhost";
const daprPort = "3500";
const client = new DaprClient({ daprHost: daprHost, daprPort: daprPort });

authController.post('/register', async (req, res) => {
    logger.info(`${req.method}-${req.originalUrl}`)

    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
        logger.error(`${req.method}-${req.originalUrl}: firstName is required`)
        return res.status(400).json({
            error: "firstName is required",
        });
    }

    if (!lastName) {
        logger.error(`${req.method}-${req.originalUrl}: lastName is required`)

        return res.status(400).json({
            error: "lastName is required",
        });
    }

    if (!email) {
        logger.error(`${req.method}-${req.originalUrl}: email is required`)

        return res.status(400).json({
            error: "email is required",
        });
    }

    if (!password) {
        logger.error(`${req.method}-${req.originalUrl}: password is required`)

        return res.status(400).json({
            error: "password is required",
        });
    }

    try {
        logger.info(`${req.method}-${req.originalUrl} Body elements: ${firstName} ${lastName} ${email} ${password}`)
        const pubSubName = "adduserpubsub";
        const pubSubTopic = "addUser";
        
        await axios.post(`${daprHost}:${daprPort}/v1.0/publish/${pubSubName}/${pubSubTopic}`, req.body);

        logger.info(`${req.method}-${req.originalUrl}: Sent to add user service`)

        res.status(200).send("Request to register has been sent :)")
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        return res.status(500).json({ error: err })
    }
})

authController.post('/login', async (req, res) => {
    logger.info(`${req.method}-${req.originalUrl}`)

    const { email, password } = req.body;

    if (!email) {
        logger.error(`${req.method}-${req.originalUrl}: email is required`)

        return res.status(400).json({
            error: "email is required",
        });
    }

    if (!password) {
        logger.error(`${req.method}-${req.originalUrl}: password is required`)

        return res.status(400).json({
            error: "password is required",
        });
    }

    try {
        const serviceMethod = "/auth/login";
        const serviceAppId = "pnaccessorauth";

        const user = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.POST, req.body);

        logger.info(`${req.method}-${req.originalUrl}: Retrieved user`)

        res.status(200).send(user);
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default authController;