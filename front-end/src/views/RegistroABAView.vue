<template>
    <Sidebar />
    <div class="main_content">
        <div class="container_registroaba">
            <div class="header_container">
                <h1>Registro ABA</h1>
                <div class="paciente_nome">
                    <p>{{ nome }}</p>
                </div>
            </div>
            <form @submit.prevent="registrarConsulta">
                <div class="form-group horainicio">
                    <label for="inicio">Hora de Início:</label>
                    <input type="time" v-model="inicio" id="inicio" />
                </div>
                <div class="form-group descricao">
                    <label for="descricao_atividade">Descrição de atividade:</label>
                    <input id="descricao_atividade" rows="4" v-model="descricao"></input>
                </div>
                <div class="form-group pequenos-inputs">
                    <label>Aplicações:</label>
                    <div class="inputs-row">
                        <select v-model="aplicacao1">
                            <option value="" disabled selected>01:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>

                        <select v-model="aplicacao2">
                            <option value="" disabled selected>02:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>

                        <select v-model="aplicacao3">
                            <option value="" disabled selected>03:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>

                        <select v-model="aplicacao4">
                            <option value="" disabled selected>04:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>

                        <select v-model="aplicacao5">
                            <option value="" disabled selected>05:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>

                        <select v-model="teste">
                            <option value="" disabled selected>TESTE:</option>
                            <option value="AT +">AT +</option>
                            <option value="AT + /">AT + /</option>
                            <option value="AT -">AT -</option>
                            <option value="AP +">AP +</option>
                            <option value="AP + /">AP + /</option>
                            <option value="AP -">AP -</option>
                            <option value="SA +">SA +</option>
                            <option value="SA + /">SA + /</option>
                            <option value="SA -">SA -</option>
                        </select>
                    </div>
                </div>

                <div class="legendas">
                    <div class="legendas_siglas">
                        <p>AT - Ajuda total</p>
                        <p>AP - Ajuda parcial</p>
                        <p>SA - Sem ajuda</p>
                    </div>
                    <div class="legendas_sinais">
                        <p>+ Acerto sem dica</p>
                        <p>+/ Acerto de acordo com o passo</p>
                        <p>- Erro</p>
                    </div>
                </div>

                <div class="form-group observacao">
                    <label for="observacao_aba">Observação:</label>
                    <textarea id="observacao_aba" rows="4" v-model="observacoes"></textarea>
                </div>

                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" accept="image/*" @change="handleFileUpload">
                </div>

                <div class="form-group horafinal">
                    <label for="fim">Hora de Fim:</label>
                    <input type="time" v-model="fim" id="fim" />
                </div>

                <button type="submit" class="btn_registrarconsultaaba">Registrar Consulta</button>
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

.container_registroaba {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_registroaba h1 {
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

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    resize: none;

}

.btn_registrarconsultaaba {
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
    margin-bottom: 15px;
}

.btn_registrarconsultaaba:hover {
    background-color: #F5F5F5;
}

.inputs-row {
    display: flex;
    gap: 15px;
    /* Espaço entre os inputs */
}

.inputs-row input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
}

.legendas {
    display: flex;
    gap: 20px;
    /* Espaço entre as duas divs */
}

.legendas p {
    margin: 0;
    font-size: 14px;
    color: #7E7E7E;
    line-height: 30px;
}

@media (max-width: 768px) {
    .main_content {
        margin-left: 0;
        padding: 10px;
    }

    .header_container {
        flex-direction: column;
        align-items: flex-start;
    }

    .container_registroaba {
        padding: 15px;
    }

    .inputs-row {
        flex-direction: column;
    }

    .inputs-row input {
        min-width: 100%;
        margin-bottom: 10px;
    }

    .legendas {
        flex-direction: column;
    }
}
</style>

<script>
import { useAuthStore } from '@/store';
import Sidebar from '@/components/Sidebar.vue';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';
import router from '@/router/index.js';

export default {
    name: 'registroaba',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore();
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || '',
            nome: sessionStorage.getItem('nome') || '',
        };
    },
    data() {
        return {
            consulta: '',
            inicio: '',
            fim: '',
            descricao: '',
            aplicacao1: '',
            aplicacao2: '',
            aplicacao3: '',
            aplicacao4: '',
            aplicacao5: '',
            teste: '',
            foto: '',
            observacoes: '',
            imagem: null, // Adicionando a variável para armazenar a imagem
        };
    },
    methods: {
        async handleFileUpload(event) {
            this.imagem = event.target.files[0]; // Armazena a imagem selecionada
        },
        async registrarConsulta() {
            const token = this.store.token;
            try {
                // Gera um identificador único para a imagem
                if (this.imagem) { // Verifica se a imagem foi selecionada
                    const uniqueImageName = uuidv4() + '_' + this.imagem.name;
                    // Cria uma referência para o armazenamento
                    const storageRef = ref(storage, 'consultaAba/' + uniqueImageName);
                    // Faz o upload da imagem
                    const snapshot = await uploadBytes(storageRef, this.imagem);
                    // Obtém a URL pública da imagem
                    this.foto = await getDownloadURL(snapshot.ref);
                } else {
                    this.foto = null; // Se não houver imagem, define como nulo
                }

                // Logando as informações da consulta para depuração
                console.log('Dados da consulta:', {
                    pacienteId: this.cpf,
                    profissionalId: this.store.usuario.usuario.email,
                    descricao: this.descricao,
                    aplicacao1: this.aplicacao1,
                    aplicacao2: this.aplicacao2,
                    aplicacao3: this.aplicacao3,
                    aplicacao4: this.aplicacao4,
                    aplicacao5: this.aplicacao5,
                    teste: this.teste,
                    inicio: this.inicio,  // Hora de início como string
                    fim: this.fim,        // Hora de fim como string
                    observacoes: this.observacoes,
                    foto: this.foto // Loga a URL da imagem se houver
                });

                // Realiza a requisição para registrar a consulta
                await Axios.post("https://clinica-maria-luiza-copia.onrender.com/consultaAba/registrar",
                    {
                        consulta: {
                            pacienteId: this.cpf,
                            profissionalId: this.store.usuario.usuario.email,
                            consulta: this.consulta,
                            data: this.data,
                            inicio: this.inicio,  // Hora de início passada como string
                            fim: this.fim,        // Hora de fim passada como string
                            descricao: this.descricao,
                            aplicacao1: this.aplicacao1,
                            aplicacao2: this.aplicacao2,
                            aplicacao3: this.aplicacao3,
                            aplicacao4: this.aplicacao4,
                            aplicacao5: this.aplicacao5,
                            teste: this.teste,
                            observacoes: this.observacoes,
                            foto: this.foto // Incluindo a URL da imagem
                        },
                    }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log('Consulta registrada com sucesso!', response.data);
                        Swal.fire('Sucesso!', 'Consulta registrada com sucesso!', 'success'); // Adicionando feedback visual
                        router.push('/pacientes')
                    })
                    .catch(error => {
                        console.error('Erro ao registrar consulta:', error);
                        Swal.fire('Erro!', 'Falha ao registrar a consulta.', 'error'); // Feedback em caso de erro
                    });
            } catch (error) {
                console.error('Erro durante o upload da imagem:', error);
                Swal.fire('Erro!', 'Falha ao fazer upload da imagem.', 'error'); // Feedback para erro no upload
            }
        }
    }
}
</script>