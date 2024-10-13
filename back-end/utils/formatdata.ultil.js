const formatarDataHoraSeparados = (dataCompleta) => {
    if (!dataCompleta) return { data: undefined, hora: undefined };

    const dataObj = new Date(dataCompleta);

    const data = dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const hora = dataObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return { data, hora };
};

module.exports = { formatarDataHoraSeparados };
