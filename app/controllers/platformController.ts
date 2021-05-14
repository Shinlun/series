import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { getAllPlatformsQuery, getAllSeriesByPlatformQuery } from "../queries/platformQueries"

export const getAllPlatforms = async (_: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllPlatformsQuery)

    res.json({ platforms: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

export const getAllSeriesByPlatform = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(getAllSeriesByPlatformQuery, [id])

    if (rows.length <= 0) {
      res.status(404).send("No series found for this platform")

      return
    }

    res.json({ series: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
