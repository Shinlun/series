import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { getAllSeriesOrderBy, getAllSeriesQuery, getSerieQuery } from "../queries/serieQueries"

export const getAllSeries = async (req: Request, res: Response) => {
  const { sort, filter } = req.query

  let queryStr = getAllSeriesQuery

  try {
    if (sort) {
      switch (sort) {
        case "rating":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesOrderBy("rating", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesOrderBy("rating", "DESC")
              break
            default:
              queryStr = getAllSeriesOrderBy("rating", "DESC")
              break
          }
          break
        case "serie_name":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesOrderBy("serie_name", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesOrderBy("serie_name", "DESC")
              break
            default:
              queryStr = getAllSeriesOrderBy("serie_name", "ASC")
              break
          }
          break
        case "serie_id":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesOrderBy("serie_id", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesOrderBy("serie_id", "DESC")
              break
            default:
              queryStr = getAllSeriesOrderBy("serie_id", "ASC")
              break
          }
          break
        default:
          break
      }
    }

    const { rows } = await pool.query(queryStr)

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
