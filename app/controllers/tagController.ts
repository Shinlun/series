import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import {
  getAllSeriesByTagQuery,
  getAllTagsOrderBy,
  getAllTagsQuery,
  getAllSeriesByTagOrderBy,
} from "../queries/tagQueries"

export const getAllTags = async (req: Request, res: Response) => {
  const { sort, filter } = req.query

  let queryStr = getAllTagsQuery

  try {
    if (sort) {
      switch (sort) {
        case "tag_id":
          switch (filter) {
            case "asc":
              queryStr = getAllTagsOrderBy("tag_id", "ASC")
              break
            case "desc":
              queryStr = getAllTagsOrderBy("tag_id", "DESC")
              break
            default:
              queryStr = getAllTagsOrderBy("tag_id", "ASC")
              break
          }
          break
        case "tag":
          switch (filter) {
            case "asc":
              queryStr = getAllTagsOrderBy("tag", "ASC")
              break
            case "desc":
              queryStr = getAllTagsOrderBy("tag", "DESC")
              break
            default:
              queryStr = getAllTagsOrderBy("tag", "ASC")
              break
          }
          break
        default:
          break
      }
    }

    const { rows } = await pool.query(queryStr)

    res.json({ tags: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

export const getAllSeriesByTag = async (req: Request, res: Response) => {
  const { id } = req.params
  const { sort, filter, and } = req.query

  let queryStr = getAllSeriesByTagQuery(and)

  try {
    switch (sort) {
      case "rating":
        switch (filter) {
          case "asc":
            queryStr = getAllSeriesByTagOrderBy("rating", "ASC", and)
            break
          case "desc":
            queryStr = getAllSeriesByTagOrderBy("rating", "DESC", and)
            break
          default:
            queryStr = getAllSeriesByTagOrderBy("rating", "DESC", and)
            break
        }
        break
      case "serie_name":
        switch (filter) {
          case "asc":
            queryStr = getAllSeriesByTagOrderBy("serie_name", "ASC", and)
            break
          case "desc":
            queryStr = getAllSeriesByTagOrderBy("serie_name", "DESC", and)
            break
          default:
            queryStr = getAllSeriesByTagOrderBy("serie_name", "ASC", and)
            break
        }
        break
      case "serie_id":
        switch (filter) {
          case "asc":
            queryStr = getAllSeriesByTagOrderBy("serie_id", "ASC", and)
            break
          case "desc":
            queryStr = getAllSeriesByTagOrderBy("serie_id", "DESC", and)
            break
          default:
            queryStr = getAllSeriesByTagOrderBy("serie_id", "ASC", and)
            break
        }
        break
      default:
        break
    }

    const { rows } = await pool.query(queryStr, [id])

    if (rows.length <= 0) {
      res.status(404).send("No series found")

      return
    }

    res.json({ series: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
