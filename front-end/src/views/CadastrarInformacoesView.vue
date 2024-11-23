<template>
    <Sidebar />
    <div class="main_content">
        <div class="container_cadastrarinformacoes">
            <div class="header_container">
                <h1>Cadastrar Informações</h1>
                <div class="paciente_nome">
                    <p>{{ nome }}</p>
                </div>
            </div>
            <form @submit.prevent="cadastrarInformacoes">
                <div class="form-group">
                    <label for="comestiveis">Comestíveis:</label>
                    <input type="text" id="comestiveis" name="comestiveis" v-model="comestiveis" required>
                </div>
                <div class="form-group">
                    <label for="tangiveis">Tangíveis:</label>
                    <input type="text" id="tangiveis" name="tangiveis" v-model="tangiveis" required>
                </div>
                <div class="form-group">
                    <label for="nome">Físico:</label>
                    <input type="text" id="fisico" name="fisico" v-model="fisicos" required>
                </div>
                <div class="form-group">
                    <label for="comestiveis">Consulta com o Neurologista:</label>
                    <input type="date" id="data" name="data_neuro" v-model="data_neuro">
                </div>
                <div class="formgroup_pequenosinputs">
                    <input type="number" id="altura" name="altura" v-model="altura" placeholder="Altura:" step="0.01">
                    <input type="number" id="peso" name="peso" v-model="peso" placeholder="Peso:" step="0.01">
        
                    <input type="text" id="alergia" name="alergia" v-model="alergicos" placeholder="Alérgico(a) à:">
                </div>

                <button type="submit" click="cadastrarInformacoes" class="btn_cadastrarinformacoes">Cadastrar</button>
            </form>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}
.main_content {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.paciente_nome {
    font-size: 18px;
    color: #7E7E7E; 
    font-weight: bold;
}

.container_cadastrarinformacoes {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_cadastrarinformacoes h1 {
    color: #84E7FF;
    margin-bottom: 20px;
}

form {
    display: grid;
    gap: 30px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.btn_cadastrarinformacoes{
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
}

.formgroup_pequenosinputs {
    display: flex;
    gap: 20px; /* Espaçamento entre os inputs */
    margin-top: 7px;
}

.formgroup_pequenosinputs input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

input::placeholder {
    color: black;
    font-size: 15px;
}
@media screen and (max-width: 768px) {
    .main_content {
        margin-left: 0;
    }

    .header_container {
        flex-direction: column;
        align-items: flex-start;
    }

    .formgroup_pequenosinputs {
        flex-direction: column;
    }

    .form-group input, 
    .formgroup_pequenosinputs input,
    .btn_cadastrarinformacoes {
        width: 100%;
    }
}

</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store.js'
import Axios from 'axios';
import router from '@/router';

export default {
    name: 'registrarconsulta',
    components: {
        Sidebar
    },
    setup(){
        const store = useAuthStore() //Importação da função do Store.js

        return{
            store,
            cpf: sessionStorage.getItem('cpf') || '',
            nome: sessionStorage.getItem('nome') || '',
        }
    },
    data() {
        return {
            pacienteId: '',
            peso: '',
            altura: '',
            comestiveis: '',
            tangiveis: '',
            fisicos: '',
            data_neuro: '',
            alergicos: ''
        }
    },
    methods:{
        async cadastrarInformacoes(){

            try {
                const token = this.store.token

                const peso = parseFloat(this.peso)
                const altura = parseFloat(this.altura)
                // Envia os dados do paciente para o backend
                console.log(this.cpf)
                await Axios.post(`https://clinica-maria-luiza-copia.onrender.com/dados/pacientes`, {
                    dados: {
                        pacienteId: this.cpf,
                        peso: peso,
                        altura: altura,
                        comestiveis: this.comestiveis,
                        tangiveis: this.tangiveis,
                        fisicos: this.fisicos,
                        data_neuro: this.data_neuro,
                        alergicos: this.alergicos, 
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    console.log(response.status)
                    Swal.fire({
                        icon: 'success',
                        title: 'Dados do paciente cadastrados com sucesso',
                        timer: 3000,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    sessionStorage.removeItem('cpf');
                    sessionStorage.removeItem('email');
                    router.push('/dashboard')

                }).catch(error =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível realizar o cadastro',
                        timer: 4000,
                    });
                    console.log(error)
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o cadastro',
                    timer: 4000,
                });
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            try {
                if (!vm.store.isAuthenticated) {
                    vm.$router.push('/login')
                }
            }
            catch {
                console.log("Erro")
            }
        })
    }
}
</script>