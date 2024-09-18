import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import healthRecordsRouter from "./routes/healthRecords.js"

dotenv.config({
    path: './.env'
})

const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




app.use("/api/health-records",healthRecordsRouter)


    ;(async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}`)
            app.on("error", (error) => {
                console.log("ERRR: ", error);
                throw error
            })

            console.log("Connected to MongoDB")

            app.listen(process.env.PORT || 8000, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error("ERROR: ", error)
            throw err
        }
    })()

