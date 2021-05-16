import type { Response, Request, NextFunction } from "express"

import Joi from "joi"

import { status } from "../helpers/status"

export default async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const paramSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
  })

  try {
    await paramSchema.validateAsync({ id })
    next()
  } catch (err) {
    console.log(err.message)
    res.status(status.error).send(err.message)

    return
  }
}
