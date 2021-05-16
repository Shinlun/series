import type { ParsedQuery } from "./serieQueries"

type GetAllPlatformsQuery = {
  sort?: ParsedQuery
  filter?: ParsedQuery
}

export const getPlatformQuery = `SELECT platform_id,  INITCAP(platform_name) as platform_name FROM platforms WHERE platform_id = $1;`

export const getAllPlatformsQuery = ({ sort, filter }: GetAllPlatformsQuery) => {
  const pSort = Array.isArray(sort) ? sort[0] : sort
  const pFilter = Array.isArray(filter) ? filter[0] : filter

  const orderQuery = pSort ? ` ORDER BY ${pSort} ${pFilter ? pFilter : "ASC"}` : ""

  return `SELECT platform_id,  INITCAP(platform_name) as platform_name FROM platforms ${orderQuery};`
}
