import express from "express"

import { getAllSeries, getSerie } from "../controllers/seriesController"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/series", getAllSeries)
router.get("/serie/:id", idMiddleware, getSerie)

export default router
