import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from 'body-parser';
import authController from "./controller/authAccessorController.js"
import logger from "./utils/logger.js"
dotenv.config()

mongoose.connect(process.env.DATABASEURL).then(() => {
    logger.info(`DB connected`)
}).catch((err) => {
    logger.error(`DB Failed to Connect ${err}`)
})

const authApp = express()

authApp.use(express.json())
authApp.use(express.urlencoded({ extended: true }))
authApp.use(cors())
authApp.use(bodyParser.json({ type: 'application/*+json' }));

authApp.use('/auth', authController)

authApp.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "adduserpubsub",
            topic: "addUser",
            route: "auth/register"
        }
    ]);
});

authApp.listen(process.env.PORT_AUTH_ACCESSOR, () => {
    logger.info(`server running on port ${process.env.PORT_AUTH_ACCESSOR}`)
})
