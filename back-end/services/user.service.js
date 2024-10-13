const jwt = require('jsonwebtoken')
const config= require('../config/app.config')
const bcrypt = require('../utils/bcrypt.ultil');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
require('dotenv').config();

async function LoginUser(usuario, res){ 
    const user = await prisma.Profissionais.findFirst({
        where: {
            email: {
                equals: usuario.email,
                mode: 'insensitive'
            }
        }
    });    

    if(user == null){
        throw new Error('Usuário ou senha inválido')
    }
    const senhaValida = bcrypt.compare(usuario.senha, user.senha);

    let dados_usuario = {
        nome: user.nome, 
        email: user.email, 
        permissao: user.permissaoId,
        foto: user.foto,
        telefone: user.telefone

    }
    if(senhaValida){
        const token = jwt.sign(dados_usuario, config.jwtSecret, {
            expiresIn: 86400 // 24 horas
        });

        return {token: token, dados_usuario}
        }
    else{
        throw new Error('Usuário ou senha inválido')
    }
}
async function updateSenha(users, res){ 
    const user = await prisma.Profissionais.findFirst({
        where:{
            email: {
                equals: users.usuario.email,
                mode: 'insensitive'
            }
        }
    });

    if(user == null){
        throw new Error('Senha inválida')
    }
    const nova_senha = bcrypt.hash(users.usuario.nova_senha, 10)
    const usuarios = await prisma.Profissionais.update({
        where:{
            email: users.usuario.email
        },
        data: {
            senha: nova_senha
        }
    });

    return usuarios;


}
module.exports = {LoginUser, updateSenha};