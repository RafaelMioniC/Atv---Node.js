const relatorioService = require("../services/relatorioService");

function gerarRelatorio(req, res) {

    const relatorio = relatorioService.gerarRelatorio();

    res.json(relatorio);
}

module.exports = {
    gerarRelatorio
};