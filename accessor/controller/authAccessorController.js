import express from "express";
import logger from "../service/logger.js";
import { createUser, loginUser } from "../service/userService.js";

const authController = express.Router();

authController.post('/register', async (req, res) => {
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
        const user = await createUser({ firstName, lastName, email, password });

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(201).json({ user });
    } catch (err) {
        if (err.message === 'Email is taken') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(409).json({ error: 'Email is taken' });
        }
        else{
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            return res.status(500).json({ error: err })
        }
    }
})

authController.post('/login', async (req, res) => {
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
        const user = await loginUser({ email, password });

        logger.info(`${req.method}-${req.originalUrl}`)

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