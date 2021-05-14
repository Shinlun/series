import pool from "./pool"

try {
  pool.on("connect", () => {
    console.log("connected to the dev db ☀️")
  })
} catch (err) {
  console.error(err)
}

const createSerieTable = async () => {
  const serieCreateQuery = `
    CREATE TABLE IF NOT EXISTS series (
        serie_id integer DEFAULT nextval('series_id_seq'::regclass) PRIMARY KEY,
        serie_name text NOT NULL UNIQUE,
        plateform integer NOT NULL REFERENCES platforms(platform_id),
        rating numeric(2,1) NOT NULL CHECK (rating >= 0.0 AND rating <= 5.0)
    );
    
    CREATE UNIQUE INDEX IF NOT EXISTS series_pkey ON series(serie_id int4_ops);
    CREATE UNIQUE INDEX IF NOT EXISTS series_serie_name_key ON series(serie_name text_ops);`

  try {
    await pool.query(serieCreateQuery)
    console.log("serie table created ✅")
    pool.end()
  } catch (err) {
    console.error(err)
    pool.end()
  }
}

const createPlateformTable = async () => {
  const plateformCreateQuery = `
    CREATE TABLE IF NOT EXISTS platforms (
        platform_id integer DEFAULT nextval('platforms_id_seq'::regclass) PRIMARY KEY,
        platform_name text NOT NULL UNIQUE
    );
    
    CREATE UNIQUE INDEX IF NOT EXISTS platforms_pkey ON platforms(platform_id int4_ops);
    CREATE UNIQUE INDEX IF NOT EXISTS platforms_platform_name_key ON platforms(platform_name text_ops);`

  try {
    await pool.query(plateformCreateQuery)
    console.log("plateform table created ✅")
    pool.end()
  } catch (err) {
    console.error(err)
    pool.end()
  }
}

const createTagTable = async () => {
  const tagCreateQuery = `
    CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        tag text NOT NULL UNIQUE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS tags_pkey ON tags(id int4_ops);
    CREATE UNIQUE INDEX IF NOT EXISTS tags_tag_key ON tags(tag text_ops);`

  try {
    await pool.query(tagCreateQuery)
    console.log("tag table created ✅")
    pool.end()
  } catch (err) {
    console.error(err)
    pool.end()
  }
}

const createTagSerieTable = async () => {
  const tagSerieCreateQuery = `
    CREATE TABLE IF NOT EXISTS "tagsSeries" (
        id integer DEFAULT nextval('"tagsSeries_id_seq"'::regclass) PRIMARY KEY,
        serie_id integer NOT NULL REFERENCES series(serie_id),
        tag_id integer NOT NULL REFERENCES tags(id)
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "tagsSeries_pkey" ON "tagsSeries"(id int4_ops);`

  try {
    await pool.query(tagSerieCreateQuery)
    console.log("tagSerie table created ✅")
    pool.end()
  } catch (err) {
    console.error(err)
    pool.end()
  }
}

const createWaoTable = async () => {
  const waoCreateQuery = `
    CREATE TABLE IF NOT EXISTS waos (
        id integer DEFAULT nextval('wao_id_seq'::regclass) PRIMARY KEY,
        wao integer NOT NULL REFERENCES series(serie_id)
    );

    CREATE UNIQUE INDEX IF NOT EXISTS wao_pkey ON waos(id int4_ops);`

  try {
    await pool.query(waoCreateQuery)
    console.log("wao table created ✅")
    pool.end()
  } catch (err) {
    console.error(err)
    pool.end()
  }
}

const createAllTables = () => {
  createPlateformTable()
  createTagTable()
  createSerieTable()
  createWaoTable()
  createTagSerieTable()
}

pool.on("remove", () => {
  console.log("client removed")
  process.exit(0)
})

export default createAllTables
