import { Query } from "express-serve-static-core"

export const getAllTagsQuery = `SELECT tag, id as tag_id from tags;`

export const getAllTagsOrderBy = (sort: "tag" | "tag_id", filter: "ASC" | "DESC") => `
    SELECT tag, id as tag_id from tags
    ORDER BY ${sort} ${filter};
`

export const getAllSeriesByTagOrderBy = (
  sort: "rating" | "serie_name" | "serie_id",
  filter: "ASC" | "DESC",
  and: any
) => {
  let r = ""

  if (Array.isArray(and)) {
    r = and.map((id) => `AND ${id} = ANY(ARRAY_AGG(tags.id)) `).join("")
  } else if (typeof and === "string") {
    r = `AND ${and} = ANY(ARRAY_AGG(tags.id))`
  }

  return `
    SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) as serie_name, INITCAP(platforms.platform_name) as platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" as t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    GROUP BY platforms.platform_name, series.serie_id
    HAVING $1 = ANY(ARRAY_AGG(tags.id)) ${and ? r : ""}
    ORDER BY series.${sort} ${filter};
`
}

export const getAllSeriesByTagQuery = (and: string | Query | string[] | Query[] | undefined) => {
  let r = ""

  if (Array.isArray(and)) {
    r = and.map((id: string | Query) => `AND ${id} = ANY(ARRAY_AGG(tags.id)) `).join("")
  } else if (typeof and === "string") {
    r = `AND ${and} = ANY(ARRAY_AGG(tags.id))`
  }

  return `
        SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) as serie_name, INITCAP(platforms.platform_name) as platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" as t
        INNER JOIN tags ON t.tag_id = tags.id
        INNER JOIN series ON t.serie_id = series.serie_id
        INNER JOIN platforms ON series.plateform = platforms.platform_id
        GROUP BY platforms.platform_name, series.serie_id
        HAVING $1 = ANY(ARRAY_AGG(tags.id)) ${and ? r : ""};
    `
}
