import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import mongoose from "mongoose"
import bodyParser from 'body-parser';
import logger from "./service/logger.js"
import authController from "./controller/authAccessorController.js"
import newsController from "./controller/newsAccessorContorller.js"
import userController from "./controller/userAccessorController.js"
import aiController from "./controller/aiAccessorController.js"

dotenv.config()

const m = morgan
const accessorApp = express()

mongoose.connect(process.env.DATABASEURL).then(() => {
    logger.info(`DB connected`)
    console.log("DB connected")
}).catch((err) => {
    logger.error(`DB Failed to Connect ${err}`)
    console.log("DB Failed to Connect", err)
})

accessorApp.use(express.json())
accessorApp.use(express.urlencoded({ extended: true }))
accessorApp.use(cors())
accessorApp.use(m("dev"))
accessorApp.use(bodyParser.json({ type: 'application/*+json' }));

accessorApp.use('/auth', authController)
accessorApp.use('/news', newsController)
accessorApp.use('/user', userController)
accessorApp.use('/ai', aiController)


accessorApp.listen(process.env.PORT_ACCESSOR, async () => {
    logger.info(`server running on port ${process.env.PORT_ACCESSOR}`)
    console.log(`server running on port ${process.env.PORT_ACCESSOR}`);
});