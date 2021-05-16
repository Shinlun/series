import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { errorMessage, status } from "../helpers/status"
import { getAllSeriesQuery, getSerieQuery } from "../queries/serieQueries"

export const getAllSeries = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllSeriesQuery({ ...req.query }))

    if (rows.length <= 0) {
      res.status(status.notfound).send("No serie found")

      return
    }

    res.json({ series: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}

export const getSerie = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(getSerieQuery, [id])

    if (rows.length <= 0) {
      res.status(status.notfound).send("No serie found")

      return
    }

    res.json({ serie: rows[0] })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}
