import express from "express"

import { getAllPlatforms, getAllSeriesByPlatform } from "../controllers/platformController"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/platforms", getAllPlatforms)
router.get("/platform/:id", idMiddleware, getAllSeriesByPlatform)

export default router
