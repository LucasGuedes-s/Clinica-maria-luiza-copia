export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
export const formatarData = (dateStr) => {
// Verifica se a string de data é válida
if (!dateStr) {
    return ''; // Retorna uma string vazia se a entrada for inválida
}

// Tenta criar uma data a partir da string
const dateParts = dateStr.split('-');

// Verifica se a data tem 3 partes (ano, mês, dia)
if (dateParts.length !== 3) {
    return ''; // Retorna uma string vazia se o formato estiver incorreto
}

const year = parseInt(dateParts[0], 10);
const month = parseInt(dateParts[1], 10) - 1; // Mês é 0-indexado
const day = parseInt(dateParts[2], 10);

// Cria um novo objeto Date
const date = new Date(Date.UTC(year, month, day));

// Verifica se a data é válida
if (isNaN(date.getTime())) {
    return ''; // Retorna uma string vazia se a data for inválida
}

const formattedDay = String(date.getUTCDate()).padStart(2, '0');
const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
const formattedYear = date.getUTCFullYear();

return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export const formatarMesAno = (data) => {
    const [ano, mes] = data.split('-'); // Divide o ano e o mês
    const dataObjeto = new Date(ano, mes - 1); // Cria uma nova data (meses começam em 0)
  
    // Formata para mostrar o nome do mês por extenso
    const nomeMes = dataObjeto.toLocaleString('pt-BR', { month: 'long' });
  
    return `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} de ${ano}`;
  }
  