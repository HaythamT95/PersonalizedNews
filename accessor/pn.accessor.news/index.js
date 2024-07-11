import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import newsController from "./controller/newsAccessorContorller.js"
import logger from "./utils/logger.js"
dotenv.config()

const authApp = express()

authApp.use(express.json())
authApp.use(express.urlencoded({ extended: true }))
authApp.use(cors())

authApp.use('/news', newsController)

authApp.listen(process.env.PORT_NEWS_ACCESSOR, () => {
    logger.info(`server running on port ${process.env.PORT_NEWS_ACCESSOR}`)
})
