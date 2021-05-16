import express from "express"

import { getAllTags, getAllSeriesByTag } from "../controllers/tagController"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/tags", getAllTags)
router.get("/tag/:id", idMiddleware, getAllSeriesByTag)

export default router
