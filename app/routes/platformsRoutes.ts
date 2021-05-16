import express from "express"

import { getAllPlatforms, getPlatform } from "../controllers/platformController"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/platforms", getAllPlatforms)
router.get("/platform/:id", idMiddleware, getPlatform)

export default router
