import express from "express"

import { getAllSeries, getSerie } from "../controllers/seriesController"
import serieIdMiddleware from "../middlewares/serieIdMiddleware"

const router = express.Router()

router.get("/", getAllSeries)
router.get("/:serie_id", serieIdMiddleware, getSerie)

export default router
