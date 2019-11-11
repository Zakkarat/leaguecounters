const sqlite3 = require('sqlite3').verbose();

const DB_PATH = 'app.db'

const DB = new sqlite3.Database(DB_PATH);

DB.serialize(() => {
    DB.run("CREATE TABLE IF NOT EXISTS counters (key INT PRIMARY KEY UNIQUE, counter INT)");
    DB.run("CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, votes INT)");
    console.log("created")
})

module.exports = DB;