import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import mongoose from "mongoose"
import bodyParser from 'body-parser';

dotenv.config()

const m = morgan
const accessorApp = express()

mongoose.connect(process.env.DATABASEURL).then(() => console.log("DB connected")).catch((err) => console.log("DB Failed to Connect", err))

accessorApp.use(express.json())
accessorApp.use(express.urlencoded({ extended: true }))
accessorApp.use(cors())
accessorApp.use(m("dev"))
accessorApp.use(bodyParser.json({ type: 'application/*+json' }));

accessorApp.listen(process.env.PORT_ACCESSOR, async () => {
    console.log(`server running on port ${process.env.PORT_ACCESSOR}`);
});