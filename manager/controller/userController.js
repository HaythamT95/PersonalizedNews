import express from "express";
import logger from "../logger.js";
import axios from "axios"

const userController = express.Router();

userController.get('/preferences/:id', async (req, res) => {
    try {
        const user = await axios.get(`http://accessor:8080/user/preferences/${req.params.id}`);
        logger.info(`${req.method}-${req.originalUrl}`)
        res.status(200).send(user.data);
    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//create/replace preferences
userController.post('/add-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const preferences = req.body;

        const user = await axios.post(`http://accessor:8080/user/add-preferences/${userID}`, preferences);
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(user.data);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Add preferences
userController.patch('/update-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const preferences = req.body;

        const user = await axios.patch(`http://accessor:8080/user/update-preferences/${userID}`, preferences);
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(user.data);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Remove specific preference from news OR tech
userController.delete('/delete-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const { type, preferences } = req.body;
        const typeAndPreference = {
            type: type,
            preferences: preferences
        };

        const user = await axios.delete(`http://accessor:8080/user/delete-preferences/${userID}`, { data: typeAndPreference });
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).send(user.data);

    } catch (err) {
        logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default userController;