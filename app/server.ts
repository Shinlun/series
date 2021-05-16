import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"

import seriesRouter from "./routes/seriesRoutes"
import platformsRouter from "./routes/platformsRoutes"
import tagsRouter from "./routes/tagsRoutes"

dotenv.config()

const app: Express = express()
const baseRoute = "/api/v1"

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(baseRoute, seriesRouter)
app.use(baseRoute, platformsRouter)
app.use(baseRoute, tagsRouter)

app.listen(process.env.API_PORT).on("listening", () => {
  console.log(`🚀 are live on ${process.env.API_PORT}`)
})

export default app
