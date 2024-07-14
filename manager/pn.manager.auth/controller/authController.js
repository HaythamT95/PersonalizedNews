import express from "express";
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

        const serviceRegisterAppId = 'pnaccessorauth'
        const serviceRegisterMethod = '/auth/register'

        await client.invoker.invoke(serviceRegisterAppId, serviceRegisterMethod, HttpMethod.POST, req.body);

        logger.info(`${req.method}-${req.originalUrl} User created successfully`)
        res.status(201).send("User created successfully")
    } catch (err) {
        const errorInfo = JSON.parse(err.message);
        const statusCode = errorInfo.status;

        if (statusCode === 409) {
            logger.error(`${req.method}-${req.originalUrl} Email is taken`)
            res.status(409).json({ error: 'Email is taken' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' })
        }
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

        res.status(200).json({ user: user });
    } catch (err) {
        const errorInfo = JSON.parse(err.message);
        const statusCode = errorInfo.status;

        if (statusCode === 404) {
            logger.error(`${req.method}-${req.originalUrl} User not found`)
            res.status(409).json({ error: 'User not found' });
        } else if (statusCode === 401) {
            logger.error(`${req.method}-${req.originalUrl} Wrong password`)
            res.status(409).json({ error: 'Wrong password' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

export default authController;