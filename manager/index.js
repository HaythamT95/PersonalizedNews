import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import logger from "./utils/logger.js"
import authController from "./controller/authController.js"
import userController from "./controller/userController.js"
import aiNewsController from "./controller/aiNewsController.js"
import mailController from "./controller/mailController.js"

dotenv.config()

const m = morgan
const managerApp = express()

managerApp.use(express.json())
managerApp.use(express.urlencoded({ extended: true }))
managerApp.use(cors())
managerApp.use(m("dev"))

managerApp.use('/auth', authController)
managerApp.use('/user', userController)
managerApp.use('/ai-news', aiNewsController)
managerApp.use('/mail', mailController)

managerApp.listen(process.env.PORT_MANAGER, () => {
    logger.info(`server running on port ${process.env.PORT_MANAGER}`)
})