<template>
    <Navbar />
    <div class="main-content_consultas">

    <div class="titulo_evolucao">
        <h1>Agenda do paciente</h1>
    </div>
    <div class="conteiner_agendar">
        <div class="container_agendamentos" v-for="agenda in agendamentos" :key="agenda.id">
            <div class="resposta-informacao">
                <label for="paciente-nome">Agendamento:</label>
                <input type="text" id="paciente-nome" :value="agenda.agendamento" readonly>
                <label for="paciente-nome">Nome do Profissional:</label>
                <input type="text" id="paciente-nome" :value="agenda.profissional.nome" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" :value="agenda.dataFormatada" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" :value="agenda.horaFormatada" readonly>
            </div>
        </div>
    </div>
        <div>
            <GraficoEvolucao :dado="cpf" />
        </div>
        <div class="titulo_evolucao">
            <h1>Histórico de consultas Aba</h1>
        </div>
        <table class="tabela">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Aplicador</th>
                    <th>Aplicação 01</th>
                    <th>Aplicação 02</th>
                    <th>Aplicação 03</th>
                    <th>Aplicação 04</th>
                    <th>Aplicação 05</th>
                    <th>Teste</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="consult in consulta" :key="consult.pacientes">
                    <td>{{ formatDate(consult.data) }}</td>
                    <td>{{ consult.profissional.nome }}</td>
                    <td>{{ consult.Aplicacao1 }}</td>
                    <td>{{ consult.Aplicacao2 }}</td>
                    <td>{{ consult.Aplicacao3 }}</td>
                    <td>{{ consult.Aplicacao4 }}</td>
                    <td>{{ consult.Aplicacao5 }}</td>
                    <td>{{ consult.teste }}</td>
                    <button class="btn_foto" @click="abrirFoto(consult.foto)">Ver foto</button>
                </tr>
            </tbody>
        </table>
        <div class="titulo_evolucao">
            <h1>Histórico de consultas</h1>
        </div>
        <div class="container_historico" v-for="consulta in consultas" :key="consulta.id">
            <h1 v-if="consultas.length == 0">Nenhuma consulta registrada</h1>

            <div class="infos_historico">
                <div class="info_item">
                    <label for="resposta-data">Data:</label>
                    <input type="text" id="resposta-data" :value="formatDate(consulta.data)" readonly>
                </div>
                <div class="info_item">
                    <label for="especialista-nome">Especialista:</label>
                    <input type="text" id="especialista-nome" :value="consulta.consulta" readonly>
                </div>
                <div class="info_item descricao">
                    <label for="historico_descricao">Descrição:</label>
                    <textarea id="historico_descricao" rows="4" :value="consulta.descricao" readonly></textarea>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';
import Navbar from '@/components/Navbar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2';

import { formatDate } from '../utils/formatarData';

export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        this.getAgenda()
        this.getConsultasAba()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            consultas: [],
            agendamentos: [],
            consulta: [],
            formatDate
        }
    },
    setup() {
        return {
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        GraficoEvolucao,
        Navbar
    },
    methods: {
            async abrirFoto(link) {
                try {
                    if (link.length === 0) {
                        Swal.fire("Nenhuma imagem foi anexada nessa consulta");
                    }
                    else if (link) {
                        window.open(link, '_blank');
                    }

                }
                catch {
                }

            },
            async getAgenda() {
                await Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/pacientes/agendamentos/${this.cpf}`
                ).then(response => {
                    this.agendamentos = response.data.agenda
                }).catch(error => {
                    console.error(error)
                })
            },
            async getConsultasAba() {
                await Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/consultasAba/paciente/${this.cpf}`
                ).then(response => {
                    this.consulta = response.data.consultas.slice(-7)
                }).catch(error => {
                    console.error(error)
                })
            },
            async getConsultas() {
                Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/consultas/paciente/${this.cpf}`,

                ).then(response => {
                    this.consultas = response.data.consultas.consultas.slice().reverse().slice(-7)
                    console.log(this.consultas)
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }
</script>

<style scoped>
.titulo_evolucao {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #84E7FF;
    padding: 15px;

}

.titulo_evolucao h1 {
    color: #D9D9D9;
}

.main-content_consultas {
    margin-left: 10px;
    padding: 10px;
}

.conteiner_agendar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.container_agendamentos {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: inline-block;
    /* Ajuste para se adaptar ao layout */
}

.resposta-informacao {
    display: flex;
    flex-direction: column;
}

.resposta-informacao label {
    margin-top: 10px;
    color: #7E7E7E;
}

.resposta-informacao input {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
}
.container_historico {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
}

.infos_historico {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.info_item {
    display: flex;
    flex-direction: column;
}

.descricao {
    grid-column: 1 / -1;
}

.botoes {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    /* Alinha os botões com espaçamento entre eles */
    gap: 10px;
}

.info_item label {
    margin-bottom: 5px;
    color: #7E7E7E;
}

.info_item input,
.info_item textarea {
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    color: #7E7E7E;
}

.info_item textarea {
    resize: vertical;
}

.btn_detalhar_hist,
.btn_arquivopdf_hist {
    flex: 1;
    /* Faz com que os botões tenham a mesma largura */
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    cursor: pointer;
}
/* Cabeçalho da tabela */
table thead {
    background-color: #84E7FF;
    color: #fff;
}

table {
    background-color: white;
    width: 100%;
}

table th,
table td {
    padding: 12px 15px;
    text-align: left;
}

table th {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
}

/* Linhas da tabela */
table tbody tr {
    border-bottom: 1px solid #ddd;
}

/* Cor alternada nas linhas da tabela */
table tbody tr:nth-of-type(even) {
    background-color: #f2f2f2;
}

table tbody tr:hover {
    background-color: #f1f1f1;
}

/* Estilo das células */
table td {
    font-size: 14px;
}

.btn_foto {
    background-color: #84E7FF;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    color: inherit;
}

/* Tornando a tabela responsiva */
@media screen and (max-width: 768px) {
    table {
        font-size: 10px; /* Diminui ainda mais o tamanho da fonte */
    }

    table th,
    table td {
        padding: 6px 8px; /* Diminui ainda mais o padding */
    }

    /* Para esconder colunas que podem ser menos importantes */
    table th:nth-child(n+3), /* Altera o n conforme necessário */
    table td:nth-child(n+3) {
        display: none; /* Esconde colunas a partir da quarta */
    }

    .btn_foto {
        font-size: 12px; /* Diminui o tamanho do botão */
        padding: 6px; /* Ajusta o padding do botão */
    }
    .conteiner_agendar {
        justify-content: center;
    }
    .container_agendamentos {
        width: 100%;
    }
}

/* Espaçamento e layout geral */
.main-content_consultas {
    padding: 20px;
}

@media (max-width: 768px) {
    .main-content_consultas {
        margin-left: 0;
        padding: 10px;
    }
}
</style>
