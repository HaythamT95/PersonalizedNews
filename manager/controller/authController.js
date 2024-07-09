import express from "express";
import axios from "axios"
import logger from "../logger.js";

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
        const user = await axios.post('http://accessor:8080/auth/register', req.body);

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(201).send(user.data);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        return res.status(500).json({ error: err })
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
        const user = await axios.post('http://accessor:8080/auth/login', req.body);

        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(user.data);
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default authController;