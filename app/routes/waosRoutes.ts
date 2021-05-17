import express from "express"

import { getAllWaos } from "../controllers/waoController"

const router = express.Router()

router.get("/waos", getAllWaos)

export default router
