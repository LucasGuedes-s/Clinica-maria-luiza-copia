const axios = require('axios');

async function getImageAsBase64(url) {
  try {
    // Aguardando a resposta da requisição
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    // Convertendo o buffer para base64
    const buffer = Buffer.from(response.data, 'binary');
    return buffer.toString('base64');
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    throw error;
  }
}

module.exports = { getImageAsBase64 };
