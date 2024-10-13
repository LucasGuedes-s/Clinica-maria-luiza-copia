const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcryptUtil = require("./utils/bcrypt.ultil");
require('dotenv').config();

async function FirstRun() {
  // Verificar se já existem permissões no banco de dados
  console.log(process.env.DATABASE_URL);
  const existingPermissions = await prisma.Permissao.findMany({})
  if (existingPermissions.length > 0) {
    console.log('Permissões já adicionadas')
  }
  else{
    await Permissoes()
  }
  //Verifica se já tem salas cadastradas e se não tiver faz o cadastrp
  const Salas = await prisma.Salas.findMany({})
  if (Salas.length > 0) {
    console.log('Salas já adicionadas')
  }
  else{
    await CadastrarSalas()
  }

  const users = await prisma.Profissionais.findMany({})
  if (users.length > 0) {
    console.log('Algum usuário já cadastrado')
  }
  else{
    await Profissionais()
  }

  //Verifica se tem pacientes no banco de dados
  const pacientes = await prisma.Pacientes.findMany({})
  if (pacientes.length > 0) {
    console.log('Algum paciente já cadastrado')
  }
  else{
    await Pacientes()
  }

  const agendamentos = await prisma.Agendamentos.findMany({})
  if (agendamentos.length > 0) {
    console.log('Agendamento')
  }
  else{
    await Agendamentos()
  }
}

async function CadastrarSalas(){
  //Cria as salas necessárias
  for(let i = 1; i < 8; i++){
    const sala = await prisma.Salas.create({
      data: {
        notas: `Sala ${i}`,
      },
    })
  }
  console.log('Salas cadastradas')
}

async function Permissoes(){
  //Cria as permissões necessárias
  const permissao1 = await prisma.permissao.create({
    data: {
      acesso: 'Admin',
    },
  })

  const permissao2 = await prisma.permissao.create({
    data: {
      acesso: 'Profissional',
    },
  })

  const permissao3 = await prisma.permissao.create({
    data: {
      acesso: 'Recepcionista',
    },
  })
  return {permissao1, permissao2, permissao3};
}
async function Pacientes(){
  
  // Criação dos Pacientes
  await prisma.Pacientes.create({
    data: {
      cpf: "138.845.747-25",
      email: 'Lucasguedes2908@gmail.com',
      nome: 'Lucas Guedes',
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2F34852164-cf03-4d5b-adb7-7aa1940aea62_WhatsApp%20Image%202024-05-09%20at%2007.49.14.jpeg?alt=media&token=2a12f0a9-da1f-4ff8-a3d4-1a260716968f',
    },
  });

  await prisma.Pacientes.create({
    data: {
      cpf: "738.585.784-25",
      email: 'JoãoPaulo@gmail.com',
      nome: 'João Paulo',
      telefone: '84 8133-2996',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Fzdnv504i.png?alt=media&token=d8594420-daa6-4a98-a966-db7db8e81d6c',
    },
  })
}
async function Profissionais(){
  // Criação dos profissionais
  let senha_users = bcryptUtil.hash(process.env.SENHA, process.env.SALTOS);

  await prisma.Profissionais.create({
    data: {
      email: 'admin@gmail.com',
      senha: senha_users,
      nome: 'Admin',
      especialidade: "Adm",
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'admin@gmail.com',
      permissaoId: parseInt(process.env.PERMISSAO_ADMIN),
    },
  })

  await prisma.Profissionais.create({
    data: {
      email: 'profissional@gmail.com',
      senha: senha_users,
      nome: 'Profissional',
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'CRN:1845',
      especialidade: "Nutricionista",
      permissaoId: parseInt(process.env.PERMISSAO_PROFISSIONAL),
    },
  })
  await prisma.Profissionais.create({
    data: {
      email: 'recepcionista@gmail.com',
      especialidade: "Recepcionista",
      senha: senha_users,
      nome: 'Recepcionista',
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'recepcionista@gmail.com',
      permissaoId: parseInt(process.env.PERMISSAO_RECEPCIONISTA),
    },
  })
}
async function Agendamentos(){
  // Criação dos agendamentos
  try{

    const agendamento = await prisma.Agendamentos.create({
      data: {
        data: new Date(),
        agendamento: 'Consulta de Lucas',
        status: 'Andamento',
        profissionalId: "profissional@gmail.com",
        pacienteId: "138.845.747-25",
        sala: 1,
      },
    })
    console.log(agendamento)

    await prisma.Agendamentos.create({
      data: {
        data: new Date(),
        agendamento: 'Consulta de João Paulo',
        status: 'Andamento',
        profissionalId: "profissional@gmail.com",
        pacienteId: "738.585.784-25",
        sala: 2,
      },
    })
  }
  catch{
    console.log("error ao adicionar agendamento")
  }
}
module.exports = {
  FirstRun,
  Permissoes,
  CadastrarSalas,
  Profissionais,
  Agendamentos
}