import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
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

authApp.use('/auth', authController)

authApp.listen(process.env.PORT_AUTH_ACCESSOR, () => {
    logger.info(`Service pn.accessor.auth running on port ${process.env.PORT_AUTH_ACCESSOR}`)
})
