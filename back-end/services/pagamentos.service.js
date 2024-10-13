const { PrismaClient } = require('@prisma/client');
const { error } = require('console');
const prisma = new PrismaClient()

async function postPagamentos(pagamento) {
  const pagamentos = await prisma.Pagamentos.create({
    data: {
      pagamento: parseFloat(pagamento.pagar.valor),
      paciente: pagamento.pagar.paciente,
      tipo_pagamento: pagamento.pagar.tipo_pagamento,
      metodo: pagamento.pagar.metodo,
      profissionalId: pagamento.pagar.profissionalId,
      Data: new Date()
    },
  });

  return pagamentos;
}
async function getPagamentos() {
  try {
    // Buscar todos os pagamentos
    const pagamentos = await prisma.Pagamentos.findMany({
      include: {
        profissional: { // Nome do campo que define a relação no seu schema
          select: {
            nome: true // Seleciona apenas o campo 'nome' do profissional
          }
        }
      }
    });
    // Agrupar os pagamentos por mês
    const pagamentosPorMes = pagamentos.reduce((acc, pagamento) => {
      // Certifique-se de que a chave da data esteja correta
      const data = new Date(pagamento.Data); // Acessando a chave 'Data' corretamente
      if (!isNaN(data.getTime())) { // Verifica se a data é válida
        const mes = data.getMonth() + 1; // getMonth() retorna de 0 a 11, então somamos 1
        const ano = data.getFullYear();
        const chaveMesAno = `${ano}-${mes.toString().padStart(2, '0')}`;

        // Se não houver um array para este mês, crie um
        if (!acc[chaveMesAno]) {
          acc[chaveMesAno] = [];
        }

        // Adicionar o pagamento ao array do mês correspondente
        acc[chaveMesAno].push(pagamento);
      } else {
        console.error(`Data inválida no pagamento com ID ${pagamento.id}`);
      }

      return acc;
    }, {});

    // Retornar o resultado agrupado
    return pagamentosPorMes;

  } catch (error) {
    console.error(error);
    return error
  }
}
async function getPagamentoMes(mes_ano) {
  try {
    const { mes, ano } = mes_ano;
    // Verificar se o mês e o ano foram fornecidos
    if (!mes || !ano) {
      return error('Mês e ano são obrigatórios');
    }

    // Buscar todos os pagamentos
    const pagamentos = await prisma.Pagamentos.findMany({});
    // Filtrar os pagamentos para o mês e ano específicos
    const pagamentosFiltrados = pagamentos.filter(pagamento => {
      const data = new Date(pagamento.Data);
      return (
        data.getMonth() + 1 === parseInt(mes) &&
        data.getFullYear() === parseInt(ano)
      );
    });

    // Organizar os pagamentos filtrados por dia dentro do mês
    const pagamentosPorDia = pagamentosFiltrados.reduce((acc, pagamento) => {
      const dia = new Date(pagamento.Data).getDate();
      if (!acc[dia]) {
        acc[dia] = [];
      }
      acc[dia].push(pagamento);
      return acc;
    }, {});
    console.log(pagamentosPorDia)
    // Retornar o resultado agrupado por dia do mês
    return pagamentosPorDia;

  } catch (error) {
    console.error(error);
  }
}
async function updatePagamento(pagamento) {
  const pagamentos = await prisma.Pagamentos.update({
    where: {
      id: pagamento.pagar.id
    },
    data: {
      paciente: pagamento.pagar.paciente,
      pagamento: parseFloat(pagamento.pagar.valor),
      tipo_pagamento: pagamento.pagar.tipo_pagamento,
      metodo: pagamento.pagar.metodo,
    },
  });

  return pagamentos;
}
module.exports = { postPagamentos, getPagamentos, getPagamentoMes, updatePagamento };