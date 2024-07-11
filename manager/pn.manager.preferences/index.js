import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import preferencesController from "./controller/preferencesController.js"

dotenv.config()

const preferencesApp = express()

preferencesApp.use(express.json())
preferencesApp.use(express.urlencoded({ extended: true }))
preferencesApp.use(cors())

preferencesApp.use('/user', preferencesController)

preferencesApp.listen(process.env.PORT_PREFERENCES_MANAGER, () => {
    //logger.info(`server running on port ${process.env.PORT_AUTH_MANAGER}`)
})
