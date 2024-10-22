<template>
    <div>
        <Sidebar />
    </div>
    <div class="main_content_dashboard">
        <div class="titulo_dashboard">
            <h1>Bem-vindo(a)!</h1>
        </div>
        <div class="container_dashboard">
            <img :src="imageUrl" alt="Foto do Usuário" @error="onImageError" />
            <div class="informacao">
                <p>Nome: {{ nome }}</p>
                <p>E-mail: {{ email }}</p>
                <p>Telefone: {{ telefone }}</p>
                <div class="botoes_div">
                <router-link to="/alterarsenha"><button class="alterar_senha_btn" click="teste">Alterar Senha</button></router-link>
                <router-link to="/realizarpagamento"><button class="realizarpagamento_btn" click="">Realizar Pagamento</button></router-link>
            </div>
            </div>
        </div>
        <h2>Agendamentos Solicitados:</h2>
        <div class="container_agendamentos_dashboard" v-for="agenda in agendamentos" :key="agenda.id">
            <div class="resposta-informacao">
                <label for="paciente-nome">Agendamento:</label>
                <input type="text" id="paciente-nome" :value="agenda.agendamento" readonly>
                <label for="paciente-nome" v-if="agenda.paciente != null">Nome do Paciente:</label>
                <input type="text" id="paciente-nome" v-if="agenda.paciente != null" :value="agenda.paciente.nome" readonly>
                <label for="resposta-data">Data:</label>
                <input type="data" id="resposta-data" :value="agenda.dataFormatada" readonly>
                <label for="resposta-hora">Hora:</label>
                <input type="hora" id="resposta-hora" :value="agenda.horaFormatada" readonly>
                <button class="btn-concluido" @click="updateAgendamento(agenda.id)">Marcar como Concluído</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0px;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
    display: block;
}

.main_content_dashboard {
    margin-left: 250px;
    padding: 20px;
}

.titulo_dashboard {
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #84E7FF;
}

.titulo_dashboard h1 {
    color: #D9D9D9;
}

.container_dashboard {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
}

.container_dashboard img {
    width: 165px;
    height: 170px;
    margin-right: 20px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.informacao {
    flex-grow: 1;
}

.botoes_div {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.alterar_senha_btn, .realizarpagamento_btn {
    padding: 10px 20px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    margin-right: 20px;
}

.informacao {
    color: #7E7E7E;
}

h2 {
    color: #84E7FF;
}

.container_agendamentos_dashboard {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    width: calc(100% - 40px);
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
    width: 100%; /* Certifica que o input ocupe 100% da largura */
    box-shadow: none; 
    box-sizing: border-box; /* Inclui o padding e borda na largura total */
}

.btn-concluido {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #F5F5F5;
    color: #7E7E7E;
    border: 1px solid #D9D9D9;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;

}

.btn-concluido:hover {
    background-color: #E7FAFF;
}
@media (max-width: 768px) {
    .main_content_dashboard {
        margin-left: 0;
        padding: 10px 5px;
    }
    .informacao{
        font-size: 12px;
        width: 50%;
        margin-left: 15px;
        text-align: left;
        margin-bottom: auto;
    }

    .container_dashboard {
        align-items: center;
    }

    .container_dashboard img {
        width: 150px;
        height: auto;
        margin-right: 0;
        margin-bottom: 0;
    }

    .alterar_senha_btn {
        display: none;
    }
    .botoes_div{
        position: static;

    }
    .realizarpagamento_btn{
        width: 40%;
        padding: 5px 5px;
    }
    .alterar_senha_btn, .realizarpagamento_btn {
        width: 100%;
        font-size: 12px;
    }

    .container_agendamentos {
        width: 100%;
    }

    .resposta-informacao {
        flex-direction: column;
    }

    .resposta-informacao label,
    .resposta-informacao input {
        width: 100%;
    }

    .btn-concluido {
        width: 100%;
    }
}
</style>
<script>
import { useAuthStore } from '@/store';
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'dashboard',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data() {
        return {
            agendamentos: [],
            user: null,
            nome: null,
            email: null,
            telefone: null,
            imageUrl: null
        }
    },
    methods: {
        async dados() {
            try {
                this.user = this.store.usuario.usuario
                this.nome = this.user.nome
                this.email = this.user.email
                this.telefone = this.user.telefone
                this.imageUrl = this.user.foto
            }
            catch {
                console.log('Erro ao obter usuários')
            }
        },
        
        async getAgendamentos(){
            const token = this.store.token
            Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/profissionais/agendamentos/${this.email}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response =>{
                this.agendamentos = response.data.agenda
                console.log(this.agendamentos)
            }).catch(error =>{
                console.log(error)
            })
        },
        async updateAgendamento(id){
            const token = this.store.token
            Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/profissional/agendamento/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response =>{
                Swal.fire({
                    icon: 'success',
                    title: 'Tarefa concluída com sucesso!',
                    text: 'O status da tarefa foi atualizado com sucesso',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
                this.getAgendamentos()
            }).catch(error =>{
                console.log(error)
            })
        }
        },
    mounted() {
        this.dados();
        this.getAgendamentos()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.store.isAuthenticated) {
                vm.$router.push('/login')
            }
        })
    }
}
</script>