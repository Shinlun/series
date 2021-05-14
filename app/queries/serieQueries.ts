export const getAllSeriesQuery = `
    SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) as serie_name, INITCAP(platforms.platform_name) as platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" as t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    GROUP BY platforms.platform_name, series.serie_id;
`

export const getSerieQuery = `
    SELECT series.serie_id, CAST(series.rating as float), INITCAP(series.serie_name) as serie_name, INITCAP(platforms.platform_name) as platform_name, ARRAY_AGG(INITCAP(tags.tag)) AS tags FROM "tagsSeries" as t
    INNER JOIN tags ON t.tag_id = tags.id
    INNER JOIN series ON t.serie_id = series.serie_id
    INNER JOIN platforms ON series.plateform = platforms.platform_id
    WHERE series.serie_id = $1::integer
    GROUP BY platforms.platform_name, series.serie_id;
`
