import type { Response, Request, NextFunction } from "express"

import Joi from "joi"

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
    res.status(500).send(err.message)

    return
  }
}
