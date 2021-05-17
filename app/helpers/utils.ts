import type { ParsedQuery } from "../queries/serieQueries"

export const fromArrayToString = (el: ParsedQuery): string | ParsedQuery | undefined => {
  return Array.isArray(el) ? el[0] : el
}
