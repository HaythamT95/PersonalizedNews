import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"

dotenv.config()

const m = morgan
const managerApp = express()

managerApp.use(express.json())
managerApp.use(express.urlencoded({ extended: true }))
managerApp.use(cors())
managerApp.use(m("dev"))

managerApp.listen(process.env.PORT_MANAGER, () => {
    console.log(`server running on port ${process.env.PORT_MANAGER}`);
})