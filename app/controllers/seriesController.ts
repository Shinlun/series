import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { getAllSeriesQuery, getSerieQuery } from "../queries/serieQueries"

export const getAllSeries = async (_: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllSeriesQuery)

    res.json({ series: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

export const getSerie = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(getSerieQuery, [id])

    if (rows.length <= 0) {
      res.status(404).send("No serie found")

      return
    }

    res.json({ serie: rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
