import express from "express"

import { getAllTags, getTag } from "../controllers/tagController"
import idMiddleware from "../middlewares/idMiddleware"

const router = express.Router()

router.get("/tags", getAllTags)
router.get("/tag/:id", idMiddleware, getTag)

export default router
