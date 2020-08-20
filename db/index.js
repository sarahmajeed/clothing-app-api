var knex = require("knex");
const pg = require("pg");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "software",
    database: "shoppingapp",
  },
});

module.exports = db;
