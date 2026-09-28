const ordens = require("../data/ordens");

function gerarRelatorio() {

    const totalOrdens = ordens.length;

    const estoquePorTipo = {
        padrao: 0,
        premium: 0,
        sobEncomenda: 0
    };

    ordens.forEach((ordem) => {

        switch (ordem.tipoProduto) {

            case 1:
                estoquePorTipo.padrao += ordem.estoqueFinal;
                break;

            case 2:
                estoquePorTipo.premium += ordem.estoqueFinal;
                break;

            case 3:
                estoquePorTipo.sobEncomenda += ordem.estoqueFinal;
                break;
        }
    });

    const custoTotal = ordens.reduce(
        (total, ordem) => total + ordem.custoTotal,
        0
    );

    const mediaCustoTotalPorOrdem =
        totalOrdens > 0
            ? custoTotal / totalOrdens
            : 0;

    let ordemMaisCara = null;
    let ordemMaisBarata = null;

    if (ordens.length > 0) {

        ordemMaisCara = ordens.reduce(
            (maior, ordem) =>
                ordem.custoTotal > maior.custoTotal
                    ? ordem
                    : maior
        );

        ordemMaisBarata = ordens.reduce(
            (menor, ordem) =>
                ordem.custoTotal < menor.custoTotal
                    ? ordem
                    : menor
        );
    }

    const quantidadeAlertas = {
        alto: 0,
        critico: 0,
        normal: 0
    };

    ordens.forEach((ordem) => {

        switch (ordem.alertaEstoque) {

            case "ALTO":
                quantidadeAlertas.alto++;
                break;

            case "CRITICO":
                quantidadeAlertas.critico++;
                break;

            case "NORMAL":
                quantidadeAlertas.normal++;
                break;
        }
    });

    const produtos = {};

    ordens.forEach((ordem) => {

        if (!produtos[ordem.codigoProduto]) {
            produtos[ordem.codigoProduto] = {
                estoqueFinalConsolidado: 0,
                valorTotalInvestido: 0
            };
        }

        produtos[ordem.codigoProduto].estoqueFinalConsolidado +=
            ordem.estoqueFinal;

        produtos[ordem.codigoProduto].valorTotalInvestido +=
            ordem.custoTotal;
    });

    return {
        totalOrdens,
        estoquePorTipo,
        mediaCustoTotalPorOrdem,
        ordemMaisCara: ordemMaisCara
            ? {
                codigoOrdem: ordemMaisCara.codigoOrdem,
                custoTotal: ordemMaisCara.custoTotal
            }
            : null,
        ordemMaisBarata: ordemMaisBarata
            ? {
                codigoOrdem: ordemMaisBarata.codigoOrdem,
                custoTotal: ordemMaisBarata.custoTotal
            }
            : null,
        quantidadeAlertas,
        porProduto: produtos
    };
}

module.exports = {
    gerarRelatorio
};