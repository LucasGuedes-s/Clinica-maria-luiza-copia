<template>
    <Sidebar />
    <div class="main-content">
        <h1>Histórico de Consultas</h1>
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
                <div class="botoes">
                    <button class="btn_detalhar_hist" @click="laudo(consulta.laudos)">Laudo</button>
                    <button class="btn_arquivopdf_hist" @click="arquivoPdf(consulta.id)">Arquivo em PDF</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
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
    resize: none;
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
@media (max-width: 768px) {
    .main-content {
        margin-left: 0;
    }
}
</style>
<script>
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import { useAuthStore } from '@/store.js'
import { formatDate } from '../utils/formatarData';
import Swal from 'sweetalert2';

export default {
    name: 'historicodeconsulta',

    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    components: {
        Sidebar
    },
    data() {
        return {
            formatDate,
            consultas: null,
            cpf: sessionStorage.getItem('cpf') || ''
        };
    },
    mounted() {
        //Limpar o CPF do sessionStorage após uso
        //sessionStorage.removeItem('cpf');
        this.getConsultas()
    },
    methods: {
        async laudo(link){
            try{
                if(link.length === 0){
                    Swal.fire("Nenhum laudo anexado nesta consulta");
                }
                else if(link){
                    for(let i =0; i < link.length; i++){
                        window.open(link[i], '_blank');
                    }
                }

            }
            catch{

            }

        },
        async arquivoPdf(id){
            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 3000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await Axios({
                url: `https://clinica-maria-luiza-copia.onrender.com/pdf/consulta/${id}`,  // Altere a URL conforme necessário
                method: 'GET',
                responseType: 'blob',  // Importante para tratar a resposta como um blob
            }).then(response => {
                // Crie um URL para o blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `consulta.pdf`); // Nome do arquivo
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao gerar PDF',
                    timer: 4000,
                })
                console.error('Erro ao baixar o PDF:', error)
            });
        },
        async getConsultas() {
            const token = this.store.token
            const cpf = this.cpf

            Axios.get(`https://clinica-maria-luiza-copia.onrender.com/consulta/paciente/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.consultas = response.data.consultas.consultas.slice().reverse()
                sessionStorage.removeItem('cpf');
            }).catch(error => {
                console.log("Aqui")
                console.error(error)
            })
        }
    }
}
</script>