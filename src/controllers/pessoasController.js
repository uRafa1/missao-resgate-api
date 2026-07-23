const db = require("../database/db");

exports.create = (req, res) => {
    const { nome, idade, sexo } = req.body;
    if (!nome || idade < 0 || idade > 120) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }
    db.run(`INSERT INTO pessoas (nome, idade, sexo) VALUES (?, ?, ?)`,
        [nome, idade, sexo],
        function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ id: this.lastID });
        });
};

exports.list = (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    db.all(`SELECT * FROM pessoas LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ pagina_atual: page, itens_por_pagina: limit, dados: rows });
    });
};

exports.getById = (req, res) => {
    db.get(`SELECT * FROM pessoas WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Pessoa não encontrada" });
        res.json(row);
    });
};

exports.update = (req, res) => {
    const { nome, idade, sexo } = req.body;
    db.run(`UPDATE pessoas SET nome=?, idade=?, sexo=? WHERE id=?`,
        [nome, idade, sexo, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            if (this.changes === 0) return res.status(404).json({ erro: "Pessoa não encontrada" });
            res.json({ mensagem: "Atualizado com sucesso" });
        });
};

exports.remove = (req, res) => {
    db.run(`DELETE FROM pessoas WHERE id=?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        if (this.changes === 0) return res.status(404).json({ erro: "Pessoa não encontrada" });
        res.status(204).send();
    });
};
