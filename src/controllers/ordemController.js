const ordemService = require("../services/ordemService");

function criarOrdem(req, res) {

    try {

        const ordem = ordemService.criarOrdem(req.body);

        res.status(201).json(ordem);

    } catch (erro) {

        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function listarOrdens(req, res) {

    try {

        const ordens = ordemService.listarOrdens({
            tipoProduto: req.query.tipoProduto,
            alertaEstoque: req.query.alertaEstoque
        });

        res.json(ordens);

    } catch (erro) {

        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function buscarOrdem(req, res) {

    try {

        const ordem = ordemService.buscarOrdem(req.params.codigoOrdem);

        res.json(ordem);

    } catch (erro) {

        res.status(404).json({
            mensagem: erro.message
        });
    }
}

function atualizarOrdem(req, res) {

    try {

        const ordem = ordemService.atualizarOrdem(
            req.params.codigoOrdem,
            req.body
        );

        res.json(ordem);

    } catch (erro) {

        res.status(400).json({
            mensagem: erro.message
        });
    }
}

function excluirOrdem(req, res) {

    try {

        ordemService.excluirOrdem(req.params.codigoOrdem);

        res.status(204).send();

    } catch (erro) {

        res.status(404).json({
            mensagem: erro.message
        });
    }
}

module.exports = {
    criarOrdem,
    listarOrdens,
    buscarOrdem,
    atualizarOrdem,
    excluirOrdem
};