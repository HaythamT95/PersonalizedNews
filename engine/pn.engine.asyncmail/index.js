import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import logger from "./utils/logger.js"
import asyncMailController from "./controller/asyncMailEngineController.js"

dotenv.config()

const mailApp = express()

mailApp.use(express.json())
mailApp.use(express.urlencoded({ extended: true }))
mailApp.use(cors())
mailApp.use(bodyParser.json({ type: 'application/*+json' }));

mailApp.use('/engine', asyncMailController)

mailApp.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "asyncmailpubsub",
            topic: "async-mail",
            route: `engine/async-mail`
        }
    ]);
});

mailApp.listen(process.env.PORT_MAIL_ENGINE, () => {
    logger.info(`Service pn.manager.mail on port ${process.env.PORT_MAIL_ENGINE}`)
})
