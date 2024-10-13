<template>
    <Sidebar />
    <div class="main_content_laudos">
        <h1>Laudos e Anexos</h1>
        <div class="conteiner_laudos" v-for="laudo in laudos" :key="laudo">            
            <iframe
            :src="laudo"
            width="100%"
            height="600px"
            frameborder="0"
            ></iframe>
            <v-img
                v-if="fileType === 'jpeg'"
                :src="laudo"
                aspect-ratio="1.77"
                max-width="100%"
            ></v-img>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main_content_laudos {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.conteiner_laudos {
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
    .main_content_laudos {
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
            laudos: null,
            cpf: sessionStorage.getItem('cpf') || ''
        };
    },
    mounted() {
        //Limpar o CPF do sessionStorage após uso
        //sessionStorage.removeItem('cpf');
        this.getLaudos()
    },
    methods: {        
        async getLaudos() {
            const token = this.store.token
            const cpf = this.cpf

            Axios.get(`https://clinica-maria-luiza.onrender.com/paciente/dados/${cpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.laudos = response.data.paciente[0].laudos
                console.log(response.data.paciente[0].laudos)
            }).catch(error => {
                console.error(error)
            })
        }
    }
}
</script>