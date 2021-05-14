import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"

import seriesRouter from "./routes/seriesRoutes"
import platformsRouter from "./routes/platformsRoutes"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v1", seriesRouter)
app.use("/api/v1", platformsRouter)

app.listen(process.env.API_PORT).on("listening", () => {
  console.log(`🚀 are live on ${process.env.API_PORT}`)
})

export default app
