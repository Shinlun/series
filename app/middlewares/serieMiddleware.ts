import type { Response, Request, NextFunction } from "express"

import Joi from "joi"

import { status } from "../helpers/status"

const sortSchema = Joi.string().valid("rating", "serie_id", "serie_name")
const filterSchema = Joi.string().valid("asc", "desc")
const idSchema = Joi.number().integer().positive()

const paramSchema = Joi.object({
  platform_id: [idSchema, Joi.array().items(idSchema)],
  tag_id: [idSchema, Joi.array().items(idSchema)],
  wao: Joi.bool(),
  sort: [sortSchema, Joi.array().items(sortSchema)],
  filter: [filterSchema, Joi.array().items(filterSchema)],
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const { sort, filter, platform_id, tag_id, wao } = req.query

  try {
    await paramSchema.validateAsync({ sort, filter, platform_id, tag_id, wao })
    next()
  } catch (err) {
    console.log(err.message)
    res.status(status.error).send(err.message)

    return
  }
}
