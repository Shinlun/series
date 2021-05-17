import express from "express"

import { getAllSeries, getSerie } from "../controllers/serieController"
import serieMiddleware from "../middlewares/serieMiddleware"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/series", serieMiddleware, getAllSeries)
router.get("/serie/:id", idMiddleware, getSerie)

export default router
