import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import {
  getAllPlatformsOrderBy,
  getAllPlatformsQuery,
  getAllSeriesByPlatformQuery,
  getAllSeriesByPlatformOrderBy,
} from "../queries/platformQueries"

export const getAllPlatforms = async (req: Request, res: Response) => {
  const { sort, filter } = req.query

  let queryStr = getAllPlatformsQuery

  try {
    if (sort) {
      switch (sort) {
        case "platform_id":
          switch (filter) {
            case "asc":
              queryStr = getAllPlatformsOrderBy("platform_id", "ASC")
              break
            case "desc":
              queryStr = getAllPlatformsOrderBy("platform_id", "DESC")
              break
            default:
              queryStr = getAllPlatformsOrderBy("platform_id", "ASC")
              break
          }
          break
        case "platform_name":
          switch (filter) {
            case "asc":
              queryStr = getAllPlatformsOrderBy("platform_name", "ASC")
              break
            case "desc":
              queryStr = getAllPlatformsOrderBy("platform_name", "DESC")
              break
            default:
              queryStr = getAllPlatformsOrderBy("platform_name", "ASC")
              break
          }
          break
        default:
          break
      }
    }

    const { rows } = await pool.query(queryStr)

    res.json({ platforms: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

export const getAllSeriesByPlatform = async (req: Request, res: Response) => {
  const { id } = req.params
  const { sort, filter } = req.query

  let queryStr = getAllSeriesByPlatformQuery
  try {
    if (sort) {
      switch (sort) {
        case "rating":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesByPlatformOrderBy("rating", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesByPlatformOrderBy("rating", "DESC")
              break
            default:
              queryStr = getAllSeriesByPlatformOrderBy("rating", "DESC")
              break
          }
          break
        case "serie_name":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesByPlatformOrderBy("serie_name", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesByPlatformOrderBy("serie_name", "DESC")
              break
            default:
              queryStr = getAllSeriesByPlatformOrderBy("serie_name", "ASC")
              break
          }
          break
        case "serie_id":
          switch (filter) {
            case "asc":
              queryStr = getAllSeriesByPlatformOrderBy("serie_id", "ASC")
              break
            case "desc":
              queryStr = getAllSeriesByPlatformOrderBy("serie_id", "DESC")
              break
            default:
              queryStr = getAllSeriesByPlatformOrderBy("serie_id", "ASC")
              break
          }
          break
        default:
          break
      }
    }

    const { rows } = await pool.query(queryStr, [id])

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
