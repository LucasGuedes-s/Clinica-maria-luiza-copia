const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');
const fs = require('fs');
const path = require('path');
const paciente = require('../pacientes.service')
const profissionais = require('../profissionais.service')
const formatar = require('../../utils/formatdata.ultil')
const { getImageAsBase64 } = require('../../utils/img.ultil');
const { PDFDocument } = require('pdf-lib');
const axios = require('axios');

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  const data_hora = formatar.formatarDataHoraSeparados(new Date())
  for (let i = 0; i <= pageCount; i++) {
    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i); // Vai para a página específica
      doc.setFontSize(10);
      doc.setTextColor(126, 126, 126);
      // Adiciona o texto do rodapé centralizado na parte inferior da página
      doc.text(
        `Página ${i} de ${pageCount}, documento retirado no dia ${data_hora.data} às ${data_hora.hora}h`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
  }
}
async function createReportPdf(usuario) {

  const doc = new jsPDF();
  const consultas = await paciente.getConsultas(usuario)

  const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');
  const imgHeight = 40;
  const imgWidth = 40;

  const pageWidth = doc.internal.pageSize.getWidth();
  const x = (pageWidth - imgWidth) / 2;
  doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

  const firstImageY = 10 + imgHeight + 10;

  // Definir as dimensões da segunda imagem
  const secondImageWidth = 40;
  const secondImageHeight = 40;

  // Posicionar a segunda imagem e o texto abaixo da primeira imagem
  const secondImageX = 15; // Posição X da segunda imagem
  const secondImageY = firstImageY + 5; // Posição Y abaixo da primeira imagem

  const textX = secondImageX + secondImageWidth + 10; // Texto ao lado direito da segunda imagem
  const textY = secondImageY + 5;

  const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))
  //Foi atendido na Clínica Maria Luíza. A seguir, são detalhados os dados de todas as consultas realizada sob esse paciente na clínica.   

  const patientInfo = `
    Nome: ${consultas.nome};
CPF: ${consultas.cpf};
E-mail: ${consultas.email}
Residente em: ${consultas.endereco}
Nascido em ${data_hora.data};
    `;
  doc.setFontSize(14);
  doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
  const lineHeightFactor = 1.5;

  doc.text(patientInfo.trim(), textX, textY, { maxWidth: 130, lineHeightFactor: lineHeightFactor });
  const image = await getImageAsBase64(consultas.foto);

  doc.addImage(image, 'JPEG', secondImageX, secondImageY, secondImageWidth, secondImageHeight);

  // Cabeçalhos da tabela
  const tableColumn = ["Consulta", "Data", "Descrição", "Profissional"];
  const tableRows = [];
  const laudos = [];

  consultas.forEach(consulta => {
    // Verifica se o array de laudos não está vazio
    if (consulta.laudos.length > 0) {
      laudos.push(...consulta.laudos); // Adiciona os laudos ao array principal
    }

    // Monta a linha da tabela com os dados da consulta
    const row = [
      consulta.consulta,
      new Date(consulta.data).toLocaleDateString(), // Formata a data
      consulta.descricao || 'N/A', // Verifica se a descrição está presente
      consulta.profissional.nome // Use o nome do profissional em vez do email
    ];
    tableRows.push(row);
  });

  const lineHeight = 10; // Altura da linha
  const tableStartY = textY + (lineHeight * 2); // Ajuste o valor conforme necessário para espaçamento

  // Adicionando as colunas da tabela
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: tableStartY,
    theme: 'grid',
    headStyles: {
      fillColor: [132, 231, 255], // Cor de fundo do cabeçalho (em RGB)
    },
  });
  addFooter(doc);
  doc.addPage();

  // Adicionar o título para a nova página
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Preto
  
  doc.text('Laudos do Paciente', 10, 20);

  for (let i = 0; i < laudos.length; i++) {
    const laudoUrl = laudos[i];
    try {
      if (i > 0) {
        doc.addPage();
        addFooter(doc);     // Adiciona uma nova página para cada laudo, exceto o primeiro
      }
      const laudoBase64 = await getImageAsBase64(laudoUrl);
      const laudoWidth = pageWidth - 20; // Ajuste de acordo com o tamanho da página
      const laudoHeight = (laudoWidth * 0.75); // Mantém a proporção da imagem
      const laudoX = 10;
      const laudoY = 20;

      // Adicionar o laudo na nova página
      doc.addImage(laudoBase64, 'JPEG', laudoX, laudoY, laudoWidth, laudoHeight);

    } catch (error) {
      console.error('Erro ao adicionar imagem do laudo:', error);
    }
  }
  const pdfBuffer = doc.output('arraybuffer');

  return pdfBuffer;
}
async function pdfConsulta(id) {
  const doc = new jsPDF();
  const consulta = await paciente.getConsulta(id);
  // Carregando a imagem
  const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');
  const imgHeight = 40;
  const imgWidth = 40;

  // Dimensões da página
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const data_hora = formatar.formatarDataHoraSeparados(new Date(consulta.data))

  // Centralizando a imagem horizontalmente
  const imgX = (pageWidth - imgWidth) / 2;
  const imgY = 10; // Coordenada Y para a imagem, ajustável se necessário

  // Adicionando a imagem ao PDF
  doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

  // Definindo o título acima do texto principal
  const title = `Resumo da Consulta: ${consulta.consulta}`;
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0); // Cor preta para o título
  const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
  const titleY = imgY + imgHeight + 20; // 20 unidades abaixo da imagem
  doc.text(title, titleX, titleY);

  // Texto principal
  const patientInfo = `
Nesta seção, apresentamos os detalhes da consulta realizada com o paciente, incluindo a data e as principais observações registradas. O atendimento foi conduzido pelo profissional responsável, que aplicou seus conhecimentos para garantir a melhor assistência ao paciente. A seguir, você encontrará informações específicas sobre a consulta, bem como os procedimentos realizados durante o atendimento.
`;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Cor cinza para o texto principal
  const maxWidth = 180;
  const textX = (pageWidth - maxWidth) / 2;
  const textY = titleY + 10; // 10 unidades abaixo do título
  doc.text(patientInfo.trim(), textX, textY, { maxWidth: maxWidth, lineHeight: 1.5 });

  // Separando o texto "Registro de consulta"
  const registroConsulta = `
Registro de consulta com: ${consulta.consulta}, na data de ${data_hora.data};

O paciente foi atendido na Clinica Maria Luiza por ${consulta.profissional.nome};

Registro da consulta: ${consulta.descricao}
`;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Cor preta para o registro de consulta
  const registroY = textY + 50; // 50 unidades abaixo do texto principal, ajustável
  doc.text(registroConsulta.trim(), textX, registroY, { maxWidth: maxWidth, lineHeight: 1.5 });

  addFooter(doc);

  for (let i = 0; i < consulta.laudos.length; i++) {
    const laudoUrl = consulta.laudos[i];
    try {
      if (consulta.laudos.length > 0) {
        doc.addPage();
        addFooter(doc);     // Adiciona uma nova página para cada laudo, exceto o primeiro
      }
      const laudoBase64 = await getImageAsBase64(laudoUrl);
      const laudoWidth = pageWidth - 20; // Ajuste de acordo com o tamanho da página
      const laudoHeight = (laudoWidth * 0.75); // Mantém a proporção da imagem
      const laudoX = 10;
      const laudoY = 20;

      // Adicionar o laudo na nova página
      doc.addImage(laudoBase64, 'JPEG', laudoX, laudoY, laudoWidth, laudoHeight);

    } catch (error) {
      console.error('Erro ao adicionar imagem do laudo:');
    }
  }
  // Gerando o buffer do PDF
  const pdfBuffer = doc.output('arraybuffer');

  return pdfBuffer;

}
async function pdfConsultas(req) {
  const doc = new jsPDF();
  const consultas = await profissionais.getConsultas(req.body)
  console.log(consultas)

  const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');
  const imgHeight = 40;
  const imgWidth = 40;

  const pageWidth = doc.internal.pageSize.getWidth();
  const x = (pageWidth - imgWidth) / 2;
  doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

  addFooter(doc);
  const pdfBuffer = doc.output('arraybuffer');

  return pdfBuffer;
}

async function pdfConsultasAba(req) {
  const consultas = await profissionais.getConsultasAba(req.body);
  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth(); 

  let inicioMes, fimMes;

  if (req.body.mesDesejado === 'atual') {
    inicioMes = new Date(anoAtual, mesAtual, 1); // Primeiro dia do mês atual
    fimMes = new Date(anoAtual, mesAtual + 1, 0); // Último dia do mês atual
  } else if (req.body.mesDesejado === 'anterior') {
      inicioMes = new Date(anoAtual, mesAtual - 1, 1); // Primeiro dia do mês anterior
      fimMes = new Date(anoAtual, mesAtual, 0); // Último dia do mês anterior
  }

  try {
    const doc = new jsPDF();
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');
    const imgHeight = 40;
    const imgWidth = 40;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 10;

    doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

    const data_inicio = formatar.formatarDataHoraSeparados(new Date(inicioMes));
    const data_final = formatar.formatarDataHoraSeparados(new Date(fimMes));

    const patientInfo = `
  Relatório de consultas realizadas entre ${data_inicio.data} e ${data_final.data}
  `;
    doc.setFontSize(14);
    doc.setTextColor(126, 126, 126);

    const lineHeightFactor = 1.5;
    const maxWidth = 180;

    const textX = (pageWidth - doc.getTextWidth(patientInfo)) / 2;
    const textY = imgY + imgHeight + 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    const registroY = textY + 5;

    doc.text(patientInfo.trim(), textX, registroY, { maxWidth: maxWidth, lineHeight: lineHeightFactor });

    // Definir colunas de acordo com req.body.data
    let columns = [
      { header: 'Data', dataKey: 'data' },
      { header: 'Profissional', dataKey: 'profissional' },
      { header: 'Paciente', dataKey: 'paciente' },
      { header: 'Atividade', dataKey: 'descricao_atividade' }
    ];

    if (req.body.hora === true) {
      // Adiciona colunas de hora se req.body.data for true
      columns.splice(1, 0, { header: 'Hora Inicio', dataKey: 'hora_inicio' }, { header: 'Hora Fim', dataKey: 'hora_fim' });
    }

    // Mapeia os dados de consultas
    const data = consultas.map(consulta => {
      const data = formatar.formatarDataHoraSeparados(new Date(consulta.data))
      const consultaData = {
        data: data.data,
        profissional: consulta.profissional.nome,
        paciente: consulta.paciente.nome,
        descricao_atividade: consulta.descricao_atividade
      };

      if (req.body.hora === true) {
        consultaData.hora_inicio = consulta.hora_inicio
        consultaData.hora_fim = consulta.hora_fim
      }

      return consultaData;
    });

    const lineHeight = 10;
    const tableStartY = registroY + (lineHeight * 2);

    doc.autoTable({
      columns: columns,
      body: data,
      startY: tableStartY,
      theme: 'grid',
      headStyles: {
        fillColor: [132, 231, 255],
      },
    });

    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
  }
}

module.exports = { createReportPdf, pdfConsulta, pdfConsultas, pdfConsultasAba, addFooter }