import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mailController from "./controller/mailController.js"

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
            pubsubname: "asyncmailpubsub",
            topic: "async-mail",
            route: `mail/async-mail`
        }
    ]);
});

mailApp.listen(process.env.PORT_MAIL_MANAGER, () => {
    //logger.info(`server running on port ${process.env.PORT_AUTH_MANAGER}`)
})
