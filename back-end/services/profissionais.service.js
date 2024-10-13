const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil");
require('dotenv').config();

async function getProfissionais(){   
    const profissionais = await prisma.Profissionais.findMany({
        select: {
            nome: true,
            email: true,
            especialidade: true,
            foto: true,
            identificador: true,
            pix: true,
            telefone: true
        }
    });

    return profissionais;
}
async function getProfissional(usuario){  
    const profissionais = await prisma.Profissionais.findMany({
        where:{
            email: usuario.usuario.email
        }
    });
    return profissionais;
}
async function getConsultas(usuario){  
    const consultas = await prisma.Consultas.findMany({
        where:{
            email: usuario.usuario.email,
            data: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)) // Filtra para consultas nos últimos 30 dias
            }
        },

    });
    return consultas;
}
async function postProfissional(user){  
    let senha_user = bcryptUtil.hash(process.env.SENHA, process.env.SALTOS);
    const cad = await prisma.Profissionais.create({
        data: {
            email: user.usuario.email,
            senha: senha_user,
            nome: user.usuario.nome,
            telefone: user.usuario.telefone,
            foto: user.usuario.foto,
            identificador: user.usuario.email,
            permissaoId: user.usuario.permissaoId,
            pix: user.usuario.pix,
            especialidade: user.usuario.especialidade
        },
    });
    return cad;
}

async function getConsultasAba(req, res){ 
    const {email, mesDesejado} = req
    // Obtenha o ano e o mês atuais
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth(); 

    let inicioMes, fimMes;

    if (mesDesejado === 'atual') {
        // Definir o intervalo de datas para o mês atual
        inicioMes = new Date(anoAtual, mesAtual, 1); // Primeiro dia do mês atual
        fimMes = new Date(anoAtual, mesAtual + 1, 0); // Último dia do mês atual
    } else if (mesDesejado === 'anterior') {
        // Definir o intervalo de datas para o mês anterior
        inicioMes = new Date(anoAtual, mesAtual - 1, 1); // Primeiro dia do mês anterior
        fimMes = new Date(anoAtual, mesAtual, 0); // Último dia do mês anterior
    }

    // Fazer a consulta filtrando pelo email do profissional e pelo intervalo de datas
    const consultas = await prisma.ConsultaAba.findMany({
        where: {
            profissionalId: email,
            data: {
                gte: inicioMes, // Data maior ou igual ao início do mês
                lte: fimMes // Data menor ou igual ao fim do mês
            }
        },
        include: {
            profissional: true, // Inclui os dados do profissional
            paciente: true
        }
    });

    return consultas;
}

module.exports = {getProfissionais, getConsultas, getConsultasAba, postProfissional, getProfissional};