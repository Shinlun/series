import type { Query } from "express-serve-static-core"

import { fromArrayToString } from "../helpers/utils"

export type ParsedQuery = string | Query | string[] | Query[] | undefined

type GetAllWaosQueryType = {
  sort?: ParsedQuery
  filter?: ParsedQuery
}

export const getAllWaosQuery = ({ sort, filter }: GetAllWaosQueryType) => {
  const pSort = fromArrayToString(sort)
  const pFilter = fromArrayToString(filter)

  const orderQuery = pSort ? ` ORDER BY series.${pSort} ${pFilter ? pFilter : "ASC"}` : ""

  return `
    SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    INNER JOIN waos ON waos.wao = series.serie_id
    GROUP BY platforms.platform_name, series.serie_id
    ${orderQuery};`
}
