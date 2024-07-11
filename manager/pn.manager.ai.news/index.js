import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import aiNewsController from "./controller/aiNewsController.js"

dotenv.config()

const aiNewsApp = express()

aiNewsApp.use(express.json())
aiNewsApp.use(express.urlencoded({ extended: true }))
aiNewsApp.use(cors())

aiNewsApp.use('/ai-news', aiNewsController)

aiNewsApp.listen(process.env.PORT_AINEWS_MANAGER, () => {
    //logger.info(`server running on port ${process.env.PORT_AUTH_MANAGER}`)
})
