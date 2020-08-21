var knex = require("knex");
const pg = require("pg");

const db = knex({
  client: "pg",
  connection: {
    host: "clothing-db.cvtpb4cbgtac.ap-south-1.rds.amazonaws.com",
    user: "postgres",
    password: "sarahsoftware13",
    database: "shoppingapp",
  },
});

module.exports = db;
