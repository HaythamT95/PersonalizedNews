import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authController from "./controller/authController.js"

dotenv.config()

const authApp = express()

authApp.use(express.json())
authApp.use(express.urlencoded({ extended: true }))
authApp.use(cors())

authApp.use('/auth', authController)

authApp.listen(process.env.PORT_AUTH_MANAGER, () => {
    //logger.info(`server running on port ${process.env.PORT_AUTH_MANAGER}`)
})
