import express from "express";
import logger from "../utils/logger.js";
import { createUser, loginUser } from "../service/userService.js";

const authController = express.Router();

authController.post('/register', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { firstName, lastName, email, password } = req.body;

        const user = await createUser({ firstName, lastName, email, password });

        logger.info(`${req.method}-${req.originalUrl} User created successfully`)

        res.status(201).json({ user: user });
    } catch (err) {
        if (err.message === 'Email is taken') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(409).json({ error: 'Email is taken' });
        }
        else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: err })
        }
    }
})

authController.post('/login', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { email, password } = req.body;

        const user = await loginUser({ email, password });

        logger.info(`${req.method}-${req.originalUrl} User retrieved successfully`)

        res.status(200).json({ user });
    } catch (err) {
        if (err.message === 'User not found') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(404).json({ error: 'User not found' });
        } else if (err.message === 'Wrong password') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(401).json({ error: 'Wrong password' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

export default authController;