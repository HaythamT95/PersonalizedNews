import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import aiController from "./controller/aiAccessorController.js"
import logger from "./utils/logger.js"
dotenv.config()

const authApp = express()

authApp.use(express.json())
authApp.use(express.urlencoded({ extended: true }))
authApp.use(cors())

authApp.use('/ai', aiController)

authApp.listen(process.env.PORT_AI_ACCESSOR, () => {
    logger.info(`server running on port ${process.env.PORT_AI_ACCESSOR}`)
})
