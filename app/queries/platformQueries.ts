import type { ParsedQuery } from "./serieQueries"

import { fromArrayToString } from "../helpers/utils"

type GetAllPlatformsQuery = {
  sort?: ParsedQuery
  filter?: ParsedQuery
}

export const getPlatformQuery = `SELECT platform_id,  INITCAP(platform_name) as platform_name FROM platforms WHERE platform_id = $1;`

export const getAllPlatformsQuery = ({ sort, filter }: GetAllPlatformsQuery) => {
  const pSort = fromArrayToString(sort)
  const pFilter = fromArrayToString(filter)

  const orderQuery = pSort ? ` ORDER BY ${pSort} ${pFilter ? pFilter : "ASC"}` : ""

  return `SELECT platform_id,  INITCAP(platform_name) as platform_name FROM platforms ${orderQuery};`
}
