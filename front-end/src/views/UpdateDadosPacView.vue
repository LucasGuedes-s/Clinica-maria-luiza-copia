<template>
    <Sidebar />
    <div class="main-content-paciente">
        <div class="container_cadastrarpac" v-for="usuario in dados.paciente" :key="usuario.cpf">
            <h1>Alterar dados</h1>
            <form @submit.prevent="editarDadosPaciente">
                <div class="form-group">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" v-model="usuario.cpf" @input="handleCpfChange"
                        :disabled="isCpfDisabled" required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" v-model="usuario.email" :disabled="isEmailDisabled"
                        required />
                </div>
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="usuario.nome" required>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" v-model="usuario.telefone">
                </div>
                <div class="form-group">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" v-model="usuario.endereco">
                </div>
                <div class="form-group">
                    <label for="comestiveis">Comestíveis:</label>
                    <input type="text" id="comestiveis" name="comestiveis"
                        v-model="usuario.paciente_dados[0].comestiveis">
                </div>
                <div class="form-group">
                    <label for="tangiveis">Tangíveis:</label>
                    <input type="text" id="tangiveis" name="tangiveis" v-model="usuario.paciente_dados[0].tangiveis">
                </div>
                <div class="form-group">
                    <label for="nome">Físico:</label>
                    <input type="text" id="fisico" name="fisico" v-model="usuario.paciente_dados[0].fisicos">
                </div>

                <div class="form-group">
                    <label for="nome">Altura:</label>
                    <input type="number" id="altura" name="altura" v-model="usuario.paciente_dados[0].altura"
                        placeholder="Altura:" step="0.01">
                </div>
                <div class="form-group">
                    <label for="nome">Peso:</label>
                    <input type="number" id="peso" name="peso" v-model="usuario.paciente_dados[0].peso"
                        placeholder="Peso:" step="0.01">
                </div>
                <div class="form-group">
                    <label for="nome">Consulta com o neuro: {{ formatarData(usuario.paciente_dados[0].consulta_neuro)
                        }}</label>
                    <input type="date" id="data" name="data_neuro" v-model="data_neuro">
                </div>
                <div class="form-group">
                    <label for="nome">Alergicos:</label>
                    <input type="text" id="alergia" name="alergia" v-model="usuario.paciente_dados[0].alergicos"
                        placeholder="Alérgico(a) à:">
                </div>
                <div class="form-group selecionar">
                    <label for="imagem">Nova foto:</label>
                    <input type="file" id="imagem" name="imagem" @change="handleFileUpload">
                </div>
                <button type="submit" class="cadastrar-btn" click="editarDadosPaciente">Cadastrar</button>

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

.main-content-paciente {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.container_cadastrarpac {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #D9D9D9;
    margin-bottom: 20px;
}

.form-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #84E7FF;
    width: 600px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px;
    align-items: start;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 10px;
}

.form-group input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.cadastrar-btn {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.cadastrar-btn:hover {
    background-color: #E7FAFF;
}

.selecionar {
    grid-column: 1 / -1;
}

@media (max-width: 768px) {
    .main-content-paciente {
        margin-left: 0;
    }

    form {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store.js'
import Axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
//Importações de subir imagem
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';
import { formatarData } from '@/utils/formatarData.js';

export default {
    name: 'cadastrar_paciente',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || '',
            email: sessionStorage.getItem('email') || ''
        }
    },
    data() {
        return {
            formatarData,
            dado: [],
            data_neuro: '',
            dados: [],
            id: '',
            imagem: null,
            foto: null,
            tipo_paciente: '',
            isEmailDisabled: false,
            isCpfDisabled: false
        }

    },
    methods: {
        handleCpfChange() {
            if (!this.isEmailDisabled) {
                this.isEmailDisabled = true; // Desabilita o campo de email ao modificar CPF
            }
        },
        async handleFileUpload(event) {
            this.imagem = event.target.files[0];
        },
        async getDados() {
            const token = this.store.token
            if (this.email != '') {
                this.id = this.email
            }
            else {
                this.id = this.cpf
            }
            Axios.get(`https://clinica-maria-luiza-copia.onrender.com/paciente/dados/${this.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (Array.isArray(response.data.paciente[0].paciente_dados) && response.data.paciente[0].paciente_dados.length === 0) {
                    // Adiciona um objeto com campos nulos ao array
                    const paciente = response.data.paciente[0];

                    // Define this.dados como um objeto que contém o array paciente
                    this.dados = {
                        paciente: [
                            {
                                cpf: paciente.cpf,
                                email: paciente.email,
                                nome: paciente.nome,
                                nome_responsavel: paciente.nome_responsavel,
                                data_nascimento: paciente.data_nascimento,
                                endereco: paciente.endereco,
                                foto: paciente.foto,
                                laudos: paciente.laudos,
                                telefone: paciente.telefone,
                                tipo_paciente: paciente.tipo_paciente,
                                paciente_dados: [] // Inicializa como array vazio
                            }
                        ]
                    };

                    // Se paciente_dados precisa ter valores padrão, você pode adicionar assim
                    this.dados.paciente[0].paciente_dados.push({
                        comestiveis: null,
                        tangiveis: null,
                        fisicos: null,
                        consulta_neuro: null,
                        peso: null,
                        altura: null,
                        alergicos: null

                    });

                    console.log(this.dados); // Para verificar a estrutura final
                }
                else {
                    const paciente = response.data.paciente[0]
                    this.dados = {
                        paciente: [
                            {
                                cpf: paciente.cpf,
                                email: paciente.email,
                                nome: paciente.nome,
                                nome_responsavel: paciente.nome_responsavel,
                                data_nascimento: paciente.data_nascimento,
                                endereco: paciente.endereco,
                                foto: paciente.foto,
                                laudos: paciente.laudos,
                                telefone: paciente.telefone,
                                tipo_paciente: paciente.tipo_paciente,
                                paciente_dados: [] // Inicializa como array vazio
                            }
                        ]
                    };
                    console.log(paciente.paciente_dados)
                    this.dados.paciente[0].paciente_dados.push({
                        comestiveis: paciente.paciente_dados[0].comestiveis,
                        tangiveis: paciente.paciente_dados[0].tangiveis,
                        fisicos: paciente.paciente_dados[0].fisicos,
                        consulta_neuro: paciente.paciente_dados[0].data_neuro,
                        peso: paciente.paciente_dados[0].peso,
                        altura: paciente.paciente_dados[0].altura,
                        alergicos: paciente.paciente_dados[0].alergicos
                    });
                    console.log(this.dados); // Para verificar a estrutura final

                }
            }).catch(error => {
                console.error(error)
            })
        },
        async editarDadosPaciente() {
            const token = this.store.token
            try {
                // Gera um identificador único para a imagem
                const uniqueImageName = uuidv4() + '_' + this.imagem.name;
                // Cria uma referência para o armazenamento
                const storageRef = ref(storage, 'pacientes/' + uniqueImageName);
                // Faz o upload da imagem
                const snapshot = await uploadBytes(storageRef, this.imagem);
                // Obtém a URL pública da imagem
                this.foto = await getDownloadURL(snapshot.ref);
            }
            catch {
                this.foto = this.dados.paciente[0].foto
            }
            try {
                if (this.data_neuro === '') {
                    this.data_neuro = this.dados.paciente[0].paciente_dados[0].data_neuro
                }
                // Envia os dados do paciente para o backend
                await Axios.post(`https://clinica-maria-luiza-copia.onrender.com/editar/dados/paciente`, {
                    dados: {
                        cpf: this.dados.paciente[0].cpf,
                        nome: this.dados.paciente[0].nome,
                        email: this.dados.paciente[0].email,
                        telefone: this.dados.paciente[0].telefone,
                        endereco: this.dados.paciente[0].endereco,
                        foto: this.foto,
                        peso: this.dados.paciente[0].paciente_dados[0].peso,
                        altura: this.dados.paciente[0].paciente_dados[0].altura,
                        comestiveis: this.dados.paciente[0].paciente_dados[0].comestiveis,
                        tangiveis: this.dados.paciente[0].paciente_dados[0].tangiveis,
                        fisicos: this.dados.paciente[0].paciente_dados[0].fisicos,
                        data_neuro: this.data_neuro,
                        alergicos: this.dados.paciente[0].paciente_dados[0].alergicos
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    sessionStorage.removeItem('cpf');
                    sessionStorage.removeItem('email');

                    Swal.fire({
                        icon: 'success',
                        title: 'Dados alterados com sucesso',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    router.push('/pacientes');
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
    mounted() {
        this.getDados()
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