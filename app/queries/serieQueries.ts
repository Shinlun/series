import type { Query } from "express-serve-static-core"

import { fromArrayToString } from "../helpers/utils"

export type ParsedQuery = string | Query | string[] | Query[] | undefined

type GetAllSeriesQueryType = {
  sort?: ParsedQuery
  filter?: ParsedQuery
  platform_id?: ParsedQuery
  tag_id?: ParsedQuery
  wao?: ParsedQuery
}

export const getSerieQuery = `
    SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    WHERE series.serie_id = $1
    GROUP BY platforms.platform_name, series.serie_id;
`

export const getAllSeriesQuery = ({ sort, filter, platform_id, tag_id, wao }: GetAllSeriesQueryType) => {
  const pSort = fromArrayToString(sort)
  const pFilter = fromArrayToString(filter)

  const orderQuery = pSort ? ` ORDER BY series.${pSort} ${pFilter ? pFilter : "ASC"}` : ""
  const platformQuery = Array.isArray(platform_id)
    ? platform_id.map((id: ParsedQuery) => `platforms.platform_id = ${id}`).join(" OR ")
    : `platforms.platform_id = ${platform_id}`
  const tagQuery = Array.isArray(tag_id)
    ? tag_id.map((id: ParsedQuery) => `${id} = ANY(ARRAY_AGG(tags.id))`).join(" AND ")
    : `${tag_id} = ANY(ARRAY_AGG(tags.id))`
  const waoQuery = wao && wao.toString() === "true" ? `INNER JOIN waos ON waos.wao = series.serie_id` : ""

  if (!platform_id && !tag_id) {
    return `
        SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
        INNER JOIN tags ON t.tag_id = tags.id
        INNER JOIN series ON t.serie_id = series.serie_id
        INNER JOIN platforms ON series.plateform = platforms.platform_id
        ${waoQuery}
        GROUP BY platforms.platform_name, series.serie_id
        ${orderQuery};
    `
  }

  if (platform_id && !tag_id) {
    return `
        SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, array_agg(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
        INNER JOIN tags ON t.tag_id = tags.id
        INNER JOIN series ON t.serie_id = series.serie_id
        INNER JOIN platforms ON series.plateform = platforms.platform_id
        ${waoQuery}
        WHERE ${platformQuery}
        GROUP BY platforms.platform_name, series.serie_id
        ${orderQuery};
    `
  }

  if (tag_id && !platform_id) {
    return `
        SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
        INNER JOIN tags ON t.tag_id = tags.id
        INNER JOIN series ON t.serie_id = series.serie_id
        INNER JOIN platforms ON series.plateform = platforms.platform_id
        ${waoQuery}
        GROUP BY platforms.platform_name, series.serie_id
        HAVING ${tagQuery}
        ${orderQuery};
    `
  }

  if (tag_id && platform_id) {
    return `
        SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, array_agg(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
        INNER JOIN tags ON t.tag_id = tags.id
        INNER JOIN series ON t.serie_id = series.serie_id
        INNER JOIN platforms ON series.plateform = platforms.platform_id
        ${waoQuery}
        WHERE ${platformQuery}
        GROUP BY platforms.platform_name, platforms.platform_id, series.serie_id
        HAVING ${tagQuery}
        ${orderQuery};
    `
  }

  return `
    SELECT series.serie_id, CAST(series.rating AS float), INITCAP(series.serie_name) AS serie_name, INITCAP(platforms.platform_name) AS platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" AS t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    GROUP BY platforms.platform_name, series.serie_id;
  `
}
