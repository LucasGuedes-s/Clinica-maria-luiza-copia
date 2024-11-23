<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_evolucao">
        <div>
            <GraficoEvolucao :dado="cpf" />
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store.js'
import GraficoEvolucao from '@/components/GraficoEvolucao.vue';
import Axios from 'axios';

import { formatDate } from '../utils/formatarData';

export default {

    name: 'historicodeconsulta',
    mounted() {
        this.getConsultas()
        // Limpar o CPF do sessionStorage após uso
        // sessionStorage.removeItem('cpf');
    },
    data() {
        return {
            consulta: [],
            formatDate
        }
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || ''
        }
    },
    components: {
        Sidebar,
        GraficoEvolucao
    },
    methods: {
        async getConsultas() {
            await Axios.get(`https://clinica-maria-luiza-copia.onrender.com/consultasAba/paciente/${this.cpf}`
            ).then(response => {
                const todasConsultas = response.data.consultas;
                // Pegar os últimos 15 itens do array de consultas
                consulta.value = todasConsultas.slice(-15);
                sessionStorage.removeItem('cpf');

            }).catch(error => {
                console.error(error)
            })
        }
    }
}
</script>

<style>
.titulo_evolucao {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #84E7FF;
}

.titulo_evolucao h1 {
    color: #D9D9D9;
}
.main-content_evolucao{
    margin-left: 250px;
    padding: 10px;
}
@media (max-width: 768px) {
    .main-content_evolucao {
        margin-left: 0;
        padding: 10px;
    }
}
</style>
