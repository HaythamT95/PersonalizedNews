import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mailController from "./controller/mailController.js"

dotenv.config()

const mailApp = express()

mailApp.use(express.json())
mailApp.use(express.urlencoded({ extended: true }))
mailApp.use(cors())

mailApp.use('/mail', mailController)

mailApp.listen(process.env.PORT_MAIL_MANAGER, () => {
    //logger.info(`server running on port ${process.env.PORT_AUTH_MANAGER}`)
})
