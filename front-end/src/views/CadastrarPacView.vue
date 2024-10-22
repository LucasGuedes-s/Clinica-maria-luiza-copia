<template>
    <Sidebar />
    <div class="main-content-paciente">
        <div class="container_cadastrarpac">
            <h1>Cadastrar Paciente</h1>
            <form @submit.prevent="cadastrarpaciente">
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" required>
                </div>
                <div class="form-group">
                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" v-model="data_nascimento" required>
                </div>

                <div class="form-group">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" v-model="cpf" required>
                </div>
                <div class="form-group">
                    <label for="responsavel">Nome do Responsável:</label>
                    <input type="text" id="responsavel" name="responsavel" v-model="nome_mae" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" v-model="telefone" required>
                </div>
                <div class="form-group">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" v-model="endereco" required>
                </div>
                <div class="form-group">
                    <label for="tipo_paciente">Tipo paciente:</label>
                    <select id="tioo" name="tipo" v-model="tipo_paciente" required>
                        <option>Paciente externo</option>
                        <option>Paciente ABA</option>
                        <option>Outro</option>
                    </select>
                </div>
                
                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem" name="imagem" @change="handleFileUpload">
                </div>
                <div class="form-group selecionar">
                    <label for="imagem">Laudos:</label>
                    <input type="file" @change="handleFileUploads" multiple>
                </div>
                <button type="submit" class="cadastrar-btn" click="cadastrarpaciente">Cadastrar</button>
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

export default {
    name: 'cadastrar_paciente',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore() //Importação da função do Store.js
        return {
            store
        }
    },
    data() {
        return {
            cpf: '',
            email: '',
            nome: '',
            nome_mae: '',
            data_nascimento: '',
            telefone: '',
            endereco: '',
            imagem: null,
            foto: null,
            tipo_paciente: '',
            imagens: [],
            laudos: []
        }
    },
    methods: {
        async handleFileUploads(event) {
            try {
                this.imagens = Array.from(event.target.files); // Armazena as imagens selecionadas

                // Loop para processar cada imagem
                for (const imagem of this.imagens) {
                    const uniqueImageName = uuidv4() + '_' + imagem.name;
                    const storageRef = ref(storage, 'laudos/' + uniqueImageName);

                    // Faz o upload de cada imagem
                    const snapshot = await uploadBytes(storageRef, imagem);

                    // Obtém a URL pública de cada imagem e adiciona ao array de laudos
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    this.laudos.push(downloadURL); // Adiciona a URL ao array de laudos
                }

                console.log("Laudos carregados:", this.laudos);
            } catch (error) {
                console.log("Erro ao carregar laudos", error);
            }

        },
        async handleFileUpload(event) {
            this.imagem = event.target.files[0];
        },
        async cadastrarpaciente() {
            const token = this.store.token
            try{
                // Gera um identificador único para a imagem
                const uniqueImageName = uuidv4() + '_' + this.imagem.name;
                // Cria uma referência para o armazenamento
                const storageRef = ref(storage, 'pacientes/' + uniqueImageName);
                // Faz o upload da imagem
                const snapshot = await uploadBytes(storageRef, this.imagem);
                // Obtém a URL pública da imagem
                this.foto = await getDownloadURL(snapshot.ref);
            }
            catch{
                this.foto = 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c'
            }
            try {
                // Envia os dados do paciente para o backend
                await Axios.post(`https://clinica-maria-luiza-copia-fqrm.onrender.com/cadastrar/pacientes`, {
                    paciente: {
                        cpf: this.cpf,
                        nome: this.nome,
                        nome_mae: this.nome_mae,
                        data_nascimento: this.data_nascimento,
                        email: this.email,
                        telefone: this.telefone,
                        endereco: this.endereco,
                        foto: this.foto,
                        laudos: this.laudos, 
                        tipo_paciente: this.tipo_paciente 
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response =>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Cadastrado com sucesso',
                        timer: 4000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    if (this.tipo_paciente === 'Paciente externo') {
                        this.$router.push('/pacientes');
                    } else if (this.tipo_paciente === 'Paciente ABA') {
                        sessionStorage.removeItem('cpf');
                        sessionStorage.removeItem('email');
                        sessionStorage.removeItem('nome');

                        sessionStorage.setItem('nome', this.nome);
                        sessionStorage.setItem('cpf', this.cpf);
                        this.$router.push({ name: 'cadastrarinformacoes' });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Tipo de paciente não especificado',
                            timer: 4000,
                        });
                        console.error('Tipo de paciente desconhecido');
                    }
                })
            } catch (error) {
                // Tratamento de erro
                console.error('Erro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível realizar o cadastro',
                    text: error.response.data.message,
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