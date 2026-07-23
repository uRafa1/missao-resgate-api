const express = require("express");
const app = express();

// conecta ao banco
require("./src/database/db");

// importa as rotas de pessoas
const pessoasRoutes = require("./src/routes/pessoas");

app.use(express.json());

// rota de verificação
app.get("/health", (req, res) => {
    res.json({
        status: "online",
        servico: "Missão Resgate Venezuela API",
        timestamp: new Date().toISOString()
    });
});

// usa as rotas de pessoas
app.use("/api/pessoas", pessoasRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
