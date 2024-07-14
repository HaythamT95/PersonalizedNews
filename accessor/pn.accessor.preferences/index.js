import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from 'body-parser';
import preferencesController from "./controller/preferencesAccessorController.js";
import logger from "./utils/logger.js"
dotenv.config()

mongoose.connect(process.env.DATABASEURL).then(() => {
    logger.info(`DB connected`)
}).catch((err) => {
    logger.error(`DB Failed to Connect ${err}`)
})

const preferencesApp = express()

preferencesApp.use(express.json())
preferencesApp.use(express.urlencoded({ extended: true }))
preferencesApp.use(cors())
preferencesApp.use(bodyParser.json({ type: 'application/*+json' }));

preferencesApp.use('/user', preferencesController)

preferencesApp.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "createorreplacepreferencepubsub",
            topic: "create-or-replace-preferences",
            route: `user/create-or-replace-preferences`
        }
    ]);
});

preferencesApp.listen(process.env.PORT_PREFERENCES_ACCESSOR, () => {
    logger.info(`Service pn.accessor.preferences on port ${process.env.PORT_PREFERENCES_ACCESSOR}`)
})
