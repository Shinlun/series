export const getAllPlatformsQuery = `SELECT platform_id,  INITCAP(platform_name) as platform_name FROM platforms;`

export const getAllSeriesByPlatformQuery = `SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) as serie_name, INITCAP(platforms.platform_name) as platform_name, array_agg(INITCAP(tags.tag)) AS tags FROM "tagsSeries" as t
INNER JOIN tags ON t.tag_id = tags.id
INNER JOIN series ON t.serie_id = series.serie_id
INNER JOIN platforms ON series.plateform = platforms.platform_id
WHERE platforms.platform_id = $1
GROUP BY platforms.platform_name, series.serie_id;`
