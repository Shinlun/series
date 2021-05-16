import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { errorMessage, status } from "../helpers/status"
import { getAllPlatformsQuery, getPlatformQuery } from "../queries/platformQueries"

export const getAllPlatforms = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllPlatformsQuery({ ...req.query }))

    if (rows.length <= 0) {
      res.status(status.notfound).send("No platforms found")

      return
    }

    res.json({ platforms: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}

export const getPlatform = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(getPlatformQuery, [id])

    if (rows.length <= 0) {
      res.status(status.notfound).send("No platform found")

      return
    }

    res.json({ platform: rows[0] })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}
