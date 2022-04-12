const pgp = require("pg-promise")()
const db = pgp({
  user: "postgres",
  password: "pass2022",
  host: "localhost",
  port: 15432,
  database: "blog",
})

module.exports = db
