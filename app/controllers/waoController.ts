import type { Response, Request } from "express"

import pool from "../db/dev/pool"
import { errorMessage, status } from "../helpers/status"
import { getAllWaosQuery } from "../queries/waoQueries"

export const getAllWaos = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(getAllWaosQuery({ ...req.query }))

    if (rows.length <= 0) {
      res.status(status.notfound).send("No waos found")

      return
    }

    res.json({ waos: rows, totalCount: rows.length })
  } catch (err) {
    console.log(err)
    res.status(status.error).json(errorMessage)
  }
}
