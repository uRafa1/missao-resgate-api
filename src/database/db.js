const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Banco conectado.");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS pessoas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade INTEGER,
            sexo TEXT,
            desaparecimento TEXT,
            status TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS avistamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoaId INTEGER,
            local TEXT,
            descricao TEXT,
            data TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS locais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            endereco TEXT,
            telefone TEXT
        )
    `);

});

module.exports = db;