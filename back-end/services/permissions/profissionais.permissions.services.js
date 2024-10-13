const verificarPermissoes = require('../../utils/permission.util.js');
const permissions = require('../../config/permissions.config.js')

async function get(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PERMISSAO_ADMIN);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function getDados(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function getAgendamentos(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function post(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next();
    } catch (err) {
        next(err);
    }
}
async function getPacientes(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function postProfissionais(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PERMISSAO_PROFISSIONAL);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function postProfissional(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PERMISSAO_ADMIN);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function postConsulta(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PROF_ADM);
        next(); 
    } catch (err) {
        next(err);
    }
}
module.exports = {get, getDados, post, postProfissionais, getAgendamentos, getPacientes, postProfissional, postConsulta};