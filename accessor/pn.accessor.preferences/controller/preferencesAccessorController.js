import express from "express";
import logger from "../utils/logger.js";
import { userData, createOrReplacePreferences, updatePreferences, deletePreference } from "../service/userService.js";

const preferencesController = express.Router();

preferencesController.get('/preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const user = await userData(req.params.id);
        logger.info(`${req.method}-${req.originalUrl}: Retrieved user`)

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
preferencesController.post('/create-or-replace-preferences', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const { userID, preferences } = req.body.data;

        await createOrReplacePreferences(userID, preferences);
        
        logger.info(`${req.method}-${req.originalUrl}: Successfully created preferences`)

        res.sendStatus(201);
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
preferencesController.patch('/update-preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const userID = req.params.id;
        const preferences = req.body;

        const user = await updatePreferences(userID, preferences);
        
        logger.info(`${req.method}-${req.originalUrl}: Successfully updated preferences`)

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
preferencesController.delete('/delete-preferences/:id', async (req, res) => {
    try {
        logger.info(`${req.method}-${req.originalUrl}`)

        const userID = req.params.id;
        const { type, preferences } = req.body;

        const user = await deletePreference(userID, type, preferences);

        logger.info(`${req.method}-${req.originalUrl}: Successfully deleted preferences`)

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

export default preferencesController;