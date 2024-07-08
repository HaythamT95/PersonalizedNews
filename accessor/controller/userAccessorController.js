import express from "express";
import logger from "../service/logger.js";
import { userData, addPreferences, updatePreferences, deletePreference } from "../service/userService.js";

const userController = express.Router();

userController.get('/preferences/:id', async (req, res) => {
    try {
        const user = await userData(req.params.id);
        logger.info(`${req.method}-${req.originalUrl}`)
        res.status(200).json({ user });
    } catch (err) {
        if (err.message === 'User not found') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(404).json({ error: 'User not found' });
        }
        else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

//create/replace preferences
userController.post('/add-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const preferences = req.body;

        const user = await addPreferences(userID, preferences);
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).json({ user });

    } catch (err) {
        if (err.message === 'User not found') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(404).json({ error: 'User not found' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

//Add preferences
userController.patch('/update-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const preferences = req.body;

        const user = await updatePreferences(userID, preferences);
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).json({ user });

    } catch (err) {
        if (err.message === 'User not found') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(404).json({ error: 'User not found' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


//Remove specific preference from news OR tech
userController.delete('/delete-preferences/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const { type, preferences } = req.body;

        const user = await deletePreference(userID, type, preferences);
        logger.info(`${req.method}-${req.originalUrl}`)

        res.status(200).json({ user });

    } catch (err) {
        if (err.message === 'User not found') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(404).json({ error: 'User not found' });
        } else if (err.message === 'Invalid preference type') {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(400).json({ error: 'Invalid preference type' });
        } else {
            logger.error(`${req.method}-${req.originalUrl}: ${err.message}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

export default userController;