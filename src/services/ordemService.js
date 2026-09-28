const ordens = require("../data/ordens");

const { validarTipoProduto } = require("../utils/validacoes");

function criarOrdem(dados) {

    const camposObrigatorios = [
        "codigoOrdem",
        "codigoProduto",
        "tipoProduto",
        "quantidadeProduzida",
        "custoUnitarioBase",
        "estoqueInicial"
    ];

    const codigoExistente = ordens.find(
        ordem => ordem.codigoOrdem === dados.codigoOrdem
    );

    if (codigoExistente) {
        throw new Error("Codigo da ordem ja existe.");
    }

    if (!validarTipoProduto(dados.tipoProduto)) {
        throw new Error("Tipo de produto deve ser 1, 2 ou 3.");
    }

    for (let i = 0; i < camposObrigatorios.length; i++) {

        const campo = camposObrigatorios[i];

        if (
            dados[campo] === undefined ||
            dados[campo] === null ||
            dados[campo] === ""
        ) {
            throw new Error(`Campo obrigatorio: ${campo}.`);
        }
    }

    if (typeof dados.quantidadeProduzida !== "number") {
        throw new Error("Quantidade produzida deve ser um numero.");
    }

    if (dados.quantidadeProduzida < 0) {
        throw new Error("Quantidade produzida nao pode ser negativa.");
    }

    if (typeof dados.custoUnitarioBase !== "number") {
        throw new Error("Custo unitario base deve ser um numero.");
    }

    if (dados.custoUnitarioBase < 0) {
        throw new Error("Custo unitario base nao pode ser negativo.");
    }

    if (typeof dados.estoqueInicial !== "number") {
        throw new Error("Estoque inicial deve ser um numero.");
    }

    if (dados.estoqueInicial < 0) {
        throw new Error("Estoque inicial nao pode ser negativo.");
    }

    

    let custoUnitarioAjustado;

    switch (dados.tipoProduto) {

        case 1:
            custoUnitarioAjustado = dados.custoUnitarioBase;
            break;

        case 2:
            custoUnitarioAjustado = dados.custoUnitarioBase * 1.10;
            break;

        case 3:
            custoUnitarioAjustado = dados.custoUnitarioBase * 1.20;
            break;
    }

    const estoqueFinal =
        dados.estoqueInicial + dados.quantidadeProduzida;

    let alertaEstoque;

    if (estoqueFinal > 5000) {
        alertaEstoque = "ALTO";
    } else if (estoqueFinal < 500) {
        alertaEstoque = "CRITICO";
    } else {
        alertaEstoque = "NORMAL";
    }

    const custoTotal =
        dados.quantidadeProduzida * custoUnitarioAjustado;

    const novaOrdem = {
        codigoOrdem: dados.codigoOrdem,
        codigoProduto: dados.codigoProduto,
        tipoProduto: dados.tipoProduto,
        quantidadeProduzida: dados.quantidadeProduzida,
        custoUnitarioBase: dados.custoUnitarioBase,
        estoqueInicial: dados.estoqueInicial,
        custoUnitarioAjustado: custoUnitarioAjustado,
        estoqueFinal: estoqueFinal,
        custoTotal: custoTotal,
        alertaEstoque: alertaEstoque
    };

    ordens.push(novaOrdem);

    return novaOrdem;
}

function listarOrdens(filtros = {}) {

    let resultado = [...ordens];

    if (filtros.tipoProduto !== undefined) {

        const tipoProduto = Number(filtros.tipoProduto);

        if (!validarTipoProduto(tipoProduto)) {
            throw new Error("Tipo de produto deve ser 1, 2 ou 3.");
        }

        resultado = resultado.filter(
            ordem => ordem.tipoProduto === tipoProduto
        );
    }

    if (filtros.alertaEstoque !== undefined) {

        const alertasValidos = [
            "ALTO",
            "CRITICO",
            "NORMAL"
        ];

        if (!alertasValidos.includes(filtros.alertaEstoque)) {
            throw new Error(
                "Alerta de estoque deve ser ALTO, CRITICO ou NORMAL."
            );
        }

        resultado = resultado.filter(
            ordem => ordem.alertaEstoque === filtros.alertaEstoque
        );
    }

    return resultado;
}


function buscarOrdem(codigoOrdem) {

    const ordem = ordens.find(
        ordem => ordem.codigoOrdem === codigoOrdem
    );

    if (!ordem) {
        throw new Error("Ordem nao encontrada.");
    }

    return ordem;
}

function atualizarOrdem(codigoOrdem, dados) {

    const ordem = buscarOrdem(codigoOrdem);

    if (dados.tipoProduto !== undefined) {

        if (!validarTipoProduto(dados.tipoProduto)) {
            throw new Error("Tipo de produto deve ser 1, 2 ou 3.");
        }

        ordem.tipoProduto = dados.tipoProduto;
    }

    if (dados.codigoProduto !== undefined) {
        ordem.codigoProduto = dados.codigoProduto;
    }

    if (dados.quantidadeProduzida !== undefined) {
        ordem.quantidadeProduzida = dados.quantidadeProduzida;
    }

    if (dados.custoUnitarioBase !== undefined) {
        ordem.custoUnitarioBase = dados.custoUnitarioBase;
    }

    if (dados.estoqueInicial !== undefined) {
        ordem.estoqueInicial = dados.estoqueInicial;
    }

    switch (ordem.tipoProduto) {

        case 1:
            ordem.custoUnitarioAjustado =
                ordem.custoUnitarioBase;
            break;

        case 2:
            ordem.custoUnitarioAjustado =
                ordem.custoUnitarioBase * 1.10;
            break;

        case 3:
            ordem.custoUnitarioAjustado =
                ordem.custoUnitarioBase * 1.20;
            break;
    }

    ordem.estoqueFinal =
        ordem.estoqueInicial + ordem.quantidadeProduzida;

    if (ordem.estoqueFinal > 5000) {
        ordem.alertaEstoque = "ALTO";
    } else if (ordem.estoqueFinal < 500) {
        ordem.alertaEstoque = "CRITICO";
    } else {
        ordem.alertaEstoque = "NORMAL";
    }

    ordem.custoTotal =
        ordem.quantidadeProduzida *
        ordem.custoUnitarioAjustado;

    return ordem;
}

function excluirOrdem(codigoOrdem) {

    const indice = ordens.findIndex(
        ordem => ordem.codigoOrdem === codigoOrdem
    );

    if (indice === -1) {
        throw new Error("Ordem nao encontrada.");
    }

    ordens.splice(indice, 1);
}

module.exports = {
    criarOrdem,
    listarOrdens,
    buscarOrdem,
    atualizarOrdem,
    excluirOrdem
};