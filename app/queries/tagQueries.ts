import type { ParsedQuery } from "./serieQueries"

type GetAllTagsQuery = {
  sort?: ParsedQuery
  filter?: ParsedQuery
}

export const getTagQuery = `SELECT INITCAP(tag) as tag_name, id as tag_id FROM tags WHERE id = $1;`

export const getAllTagsQuery = ({ sort, filter }: GetAllTagsQuery) => {
  const pSort = Array.isArray(sort) ? sort[0] : sort
  const pFilter = Array.isArray(filter) ? filter[0] : filter

  const orderQuery = pSort ? ` ORDER BY ${pSort} ${pFilter ? pFilter : "ASC"}` : ""

  return `
      SELECT INITCAP(tag) as tag_name, id as tag_id FROM tags
      ${orderQuery};
  `
}
