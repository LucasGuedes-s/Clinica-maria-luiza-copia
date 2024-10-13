const Pagamentos = require('../services/pagamentos.service')

async function getPagamentos(req, res, next){
    try {
        const pagamento = await Pagamentos.getPagamentos()
        res.status(200).json({pagamento});
        next()
    } catch (err) {
        console.error(`Erro ao receber os pagamentos`);
    }
}
async function postPagamentos(req, res, next){
    try {
        const pagamentos = await Pagamentos.postPagamentos(req.body)
        res.status(200).json({pagamentos});
        next()
    } catch (err) {
        console.error(err)
        console.error(`Erro ao realizar pagamento`);
    }
}
async function updatePagamento(req, res, next){
    try {
        const pagamento = await Pagamentos.updatePagamento(req.body)
        res.status(200).json({pagamento});
        next()
    } catch (err) {
        console.error(err)
        console.error(`Erro ao alterar pagamento`);
    }
}
module.exports = { getPagamentos, postPagamentos, updatePagamento };