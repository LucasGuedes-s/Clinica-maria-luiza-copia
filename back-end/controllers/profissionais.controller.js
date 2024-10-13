const Profissional = require('../services/profissionais.service')

async function getProfissionais(req, res, next){
    try {
        const profissionais = await Profissional.getProfissionais()
        res.status(200).json({profissionais});
        next()
    } catch (err) {
        console.error(`Erro ao receber profissionais`);
    }
}
async function getProfissional(req, res, next){
    try {
        const profissional = await Profissional.getProfissional(req.body)
        res.status(200).json({profissional});
        next()
    } catch (err) {
        console.error(`Erro ao receber esse profissional`);
    }
}

async function postProfissional(req, res, next){
    try {
        const cadastro = await Profissional.postProfissional(req.body)
        res.status(200).json({cadastro});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao receber usuário`);
    }  
}
module.exports = {getProfissionais, getProfissional, postProfissional};