const knex = require("knex")({
    client: "pg",
    connection: {
        host: "tuffi.db.elephantsql.com",
        port: 5432,
        user: "xllkwhhe",
        password: process.env.DB_PASSWORD,
        database: "xllkwhhe",
    },
});

module.exports = knex;