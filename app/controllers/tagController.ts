import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { errorMessage, status } from "../helpers/status"
import { getAllTagsQuery, getTagQuery } from "../queries/tagQueries"

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllTagsQuery({ ...req.query }))

    if (rows.length <= 0) {
      res.status(status.notfound).send("No tags found")

      return
    }

    res.json({ tags: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}

export const getTag = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query(getTagQuery, [id])

    if (rows.length <= 0) {
      res.status(status.notfound).send("No tag found")

      return
    }

    res.json({ tag: rows[0] })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}
