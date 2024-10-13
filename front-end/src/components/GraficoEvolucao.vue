<template>
    <div class="titulo">
        <h1>Evolução do paciente</h1>
    </div>
    <div>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
import Axios from 'axios';

export default {
    props: {
        dado: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const consultas = ref([]);
        const chart = ref(null);
        const agendarconsulta = async () => {
            const cpf = props.dado;
            try {

                const response = await Axios.get(`https://clinica-maria-luiza.onrender.com/consultasAba/paciente/${cpf}`);
                const todasConsultas = response.data.consultas;

                // Pegar os últimos 15 itens do array de consultas
                consultas.value = todasConsultas.slice(-15);
                //consultas.value = response.data.consultas;
                sessionStorage.removeItem('cpf');

                updateChart();
            } catch (error) {
                console.error(error);
            }
        };

        const processData = () => {
            const labels = consultas.value.map(consulta => new Date(consulta.data).toLocaleDateString());

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Aplicacao1',
                        backgroundColor: 'rgba(247, 121, 121, 0.5)',
                        borderColor: 'rgba(247, 121, 121, 1)',
                        data: consultas.value.map(consulta => ({
                            x: new Date(consulta.data).toLocaleDateString(),
                            y: mapResultToNumber(consulta.Aplicacao1),
                            result: consulta.Aplicacao1
                        })),
                    },
                    {
                        label: 'Aplicacao2',
                        backgroundColor: 'rgba(121, 247, 121, 0.5)',
                        borderColor: 'rgba(121, 247, 121, 1)',
                        data: consultas.value.map(consulta => ({
                            x: new Date(consulta.data).toLocaleDateString(),
                            y: mapResultToNumber(consulta.Aplicacao2),
                            result: consulta.Aplicacao2
                        })),
                    },
                    {
                        label: 'Aplicacao3',
                        backgroundColor: 'rgba(121, 121, 247, 0.5)',
                        borderColor: 'rgba(121, 121, 247, 1)',
                        data: consultas.value.map(consulta => ({
                            x: new Date(consulta.data).toLocaleDateString(),
                            y: mapResultToNumber(consulta.Aplicacao3),
                            result: consulta.Aplicacao3
                        })),
                    },
                    {
                        label: 'Aplicacao4',
                        backgroundColor: 'rgba(247, 247, 121, 0.5)',
                        borderColor: 'rgba(247, 247, 121, 1)',
                        data: consultas.value.map(consulta => ({
                            x: new Date(consulta.data).toLocaleDateString(),
                            y: mapResultToNumber(consulta.Aplicacao4),
                            result: consulta.Aplicacao4
                        })),
                    },
                    {
                        label: 'Aplicacao5',
                        backgroundColor: 'rgba(121, 247, 247, 0.5)',
                        borderColor: 'rgba(121, 247, 247, 1)',
                        data: consultas.value.map(consulta => ({
                            x: new Date(consulta.data).toLocaleDateString(),
                            y: mapResultToNumber(consulta.Aplicacao5),
                            result: consulta.Aplicacao5
                        })),
                    },
                ],
            };

            return data;
        };

        const mapResultToNumber = (result) => {
            switch (result) {
                case 'AT +': return 3;
                case 'AT -': return 1;
                case 'AT + /': return 4;

                case 'AP +': return 6;
                case 'AP -': return 5;
                case 'AP + /': return 7;

                case 'SA +': return 9;
                case 'SA -': return 8;
                case 'SA + /': return 10;
                default: return 0; // Valor padrão para outros resultados
            }
        };

        const updateChart = () => {
            const ctx = document.getElementById('myChart').getContext('2d');

            if (chart.value) {
                chart.value.destroy(); 
            }

            chart.value = new Chart(ctx, {
                type: 'line',
                data: processData(),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Datas',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Avaliação',
                            },
                            beginAtZero: true,
                            suggestedMax: 5, // Ajuste conforme necessário
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    // Obter a informação do dataset
                                    const label = context.dataset.label || '';
                                    // Obter o valor da avaliação
                                    const result = context.raw.result;
                                    // Retornar o texto que será exibido
                                    return `${label}: ${result}`;
                                }
                            }
                        }
                    }
                },
            });
        };

        onMounted(() => {
            agendarconsulta();
        });

        return {
            consultas,
            updateChart,
        };
    },
}
</script>

<style>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
    display: block;
}
.main-content {
    margin-left: 250px;
    padding: 20px;
}

.titulo {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.titulo h1 {
    color: #D9D9D9;
}
#myChart{
    background-color: white;
}
</style>
