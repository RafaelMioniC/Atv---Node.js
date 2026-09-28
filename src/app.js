const express = require("express");

const ordemRoutes = require("./routes/ordensRoutes");

const relatorioRoutes = require("./routes/relatorioRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de controle de producao funcionando!"
    });
});

app.use("/ordens", ordemRoutes);
app.use("/relatorios", relatorioRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});