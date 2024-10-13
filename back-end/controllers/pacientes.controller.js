const Paciente = require('../services/pacientes.service')
const consulta = require('../services/pacientes.service')

async function loginPaciente(req, res, next){
    try {
        const paciente = await Paciente.loginPaciente(req.params.id)
        res.status(200).json({paciente});
        next()
    } catch (err) {
        console.error(`Erro ao receber os pacientes`);
    }
}

async function getPacientes(req, res, next){
    try {
        const pacientes = await Paciente.getPacientes()
        res.status(200).json({pacientes});
        next()
    } catch (err) {
        console.error(`Erro ao receber os pacientes`);
    }
}
async function getPaciente(req, res, next){
    try {
        const paciente = await Paciente.getPaciente(req.params.id)
        res.status(200).json({paciente});
        next()
    } catch (err) {
        console.error(`Erro ao receber esse paciente`);
    }
}
async function getConsultas(req, res, next){
    try {
        const consultas = await Paciente.getConsultas(req.params.cpf)
        res.status(200).json({consultas});
        next()
    } catch (err) {
        console.error(`Erro ao receber as consultas do paciente ${req.params.cpf}`);
    }
}
async function getConsultasAba(req, res, next){
    try {
        const consultas = await consulta.getConsultasAba(req.params.cpf)
        res.status(200).json({consultas});
        next()
    } catch (err) {
        console.error(`Erro ao receber as consultas`);
    }
}
async function postPacientes(req, res, next){
    try {
        const pacientes = await Paciente.cadastrarPaciente(req.body)
        res.status(200).json({pacientes});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao receber os pacientes`);
    }
}
async function postDados(req, res, next){
    try {
        const dados = await Paciente.cadastrarDados(req.body)
        res.status(200).json({dados});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao receber os dados do paciente`);
    }
}
async function postConsulta(req, res, next){
    try {
        const consulta = await Paciente.registrarConsulta(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar a consulta`);
    }
}
// 
async function postLaudos(req, res, next){
    try {
        const laudo = await Paciente.postLaudos(req.body)
        res.status(200).json({laudo});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar a laudos`);
    }
}
async function postConsultaAba(req, res, next){
    try {
        const consulta = await Paciente.registrarConsultaAba(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar a consulta aba`);
    }
}
async function updateDados(req, res, next){
    try {
        const dados = await Paciente.updateDadosPaciente(req.body)
        res.status(200).json({dados});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao alterar dados do paciente`);
    }
}
module.exports = {loginPaciente, getPacientes, postLaudos, getPaciente, getConsultas, getConsultasAba, postPacientes, postDados, postConsulta, postConsultaAba, updateDados};