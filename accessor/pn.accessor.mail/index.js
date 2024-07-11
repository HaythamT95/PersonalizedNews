import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import logger from "./utils/logger.js"
import mailController from "./controller/mailAccessorController.js"

dotenv.config()

const mailApp = express()

mailApp.use(express.json())
mailApp.use(express.urlencoded({ extended: true }))
mailApp.use(cors())
mailApp.use(bodyParser.json({ type: 'application/*+json' }));

mailApp.use('/mail', mailController)

mailApp.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "sendmailpubsub",
            topic: "send-mail",
            route: `mail/send-mail`
        }
    ]);
});

mailApp.listen(process.env.PORT_MAIL_ACCESSOR, async () => {
    logger.info(`server running on port ${process.env.PORT_MAIL_ACCESSOR}`)
});