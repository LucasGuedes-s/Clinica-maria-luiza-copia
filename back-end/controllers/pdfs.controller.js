//const Paciente = require('../services/pacientes.service')
const { Console } = require('console');
const pdf = require('../services/pdfGeration/historico.consultas.service.js')
const pdfpagamentos = require('../services/pdfGeration/historico.pagamentos.service.js')

async function getpdfConsultas(req, res){
    const pdfBuffer = await pdf.createReportPdf(req.params.id)
    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
    
};

async function getpdfConsulta(req, res){
    const pdfBuffer = await pdf.pdfConsulta(req.params.id)
    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};

async function getpdfPagamento(req, res){
    const pdfBuffer = await pdfpagamentos.pdfPagamentos(req.body)
    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};
async function getpdfConsultasAba(req, res){
    const pdfBuffer = await pdf.pdfConsultasAba(req)
    // Envie o PDF como resposta
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};
module.exports = { getpdfConsultas, getpdfConsulta, getpdfConsultasAba, getpdfPagamento }