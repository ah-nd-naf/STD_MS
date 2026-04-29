const { Pool } = require("pg"); // pool hepls app to handle multiple database requests at once
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,

});

// testing if it works

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log("Database connected successfully");
    release();
});

module.exports = pool;



