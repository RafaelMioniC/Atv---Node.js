function validarTipoProduto(tipoProduto) {

    const tiposValidos = [1, 2, 3];

    for (let i = 0; i < tiposValidos.length; i++) {

        if (tipoProduto === tiposValidos[i]) {
            return true;
        }
    }

    return false;
}

module.exports = {
    validarTipoProduto
};