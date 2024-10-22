<template>
    <Sidebar />
    <div class="main_content_registrar">
        <div class="container_registrarconsulta">
            <h1>Registrar Consulta</h1>
            <form @submit.prevent="registrarConsulta">
                <div class="form-group">
                    <label for="nome">Registrando a consulta de: </label>
                    <input type="text" id="nome_paciente" name="nome" :value="nome" required>
                </div>
                <div class="form-group">
                    <label for="especialidade">Especialidade:</label>
                    <select id="especialidade" name="especialidade" v-model="especialidade" required>
                        <option v-for="especialidade in especialidades" :key="especialidade" :value="especialidade">
                            {{ especialidade }}
                        </option>
                    </select>
                </div>
                <div class="form-group selecionar">
                    <label for="imagem">Laudos:</label>
                    <input type="file" @change="handleFileUpload" multiple>
                </div>
                <div class="form-group descricao">
                    <label for="historico_descricao">Consultas:</label>
                    <textarea id="historico_descricao" rows="4" v-model="descricao"></textarea>
                </div>
                <button type="submit" class="registrarconsulta_btn" click="registrarConsulta">Cadastrar</button>
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

.main_content_registrar {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.container_registrarconsulta {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #84E7FF;
}

form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
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
.form-group textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
}

.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.selecionar,
.descricao {
    grid-column: 1 / -1;
}

.form-group textarea {
    resize: none;
}

.registrarconsulta_btn {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: #7E7E7E;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    font-family: 'Montserrat', sans-serif;
}

@media (max-width: 768px) {

    form {
        grid-template-columns: 1fr;
        /* Apenas uma coluna em telas menores */
    }

    .registrarconsulta_btn {
        width: 100%;
    }

    .main_content_registrar {
        margin-left: 0;
        padding: 10px;
    }

    .container_registrarconsulta {
        padding: 15px;
        /* Reduz o padding para telas menores */
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2';

//Importações de subir imagem
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import { v4 as uuidv4 } from 'uuid';
import router from '@/router/index.js';

export default {
    name: 'registrarconsulta',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store,
            cpf: sessionStorage.getItem('cpf') || '',
            nome: sessionStorage.getItem('nome') || '',
        }
    },
    data() {
        return {
            especialidade: '',
            especialidades: [],
            consulta: '',
            descricao: '',
            imagens: [],
            laudos: []
        }
    },
    methods: {
        async handleFileUpload(event) {
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
        async registrarConsulta() {
            const token = this.store.token
            Swal.fire({
                title: 'Aguarde...',
                text: 'Registrando consulta',
                timer: 5000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const profissionalId = this.store.usuario.usuario.email
            await Axios.post("https://clinica-maria-luiza-copia-fqrm.onrender.com/consulta/registrar", {
                consulta: {
                    consulta: this.especialidade,
                    descricao: this.descricao,
                    pacienteId: this.cpf,
                    profissionalId: profissionalId,
                    laudos: this.laudos
                },
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then(response => {
                console.log(response.status)
                Swal.fire({
                    icon: 'success',
                    title: `Consulta de ${this.nome} cadastrada com sucesso`,
                    timer: 4000,
                })
                router.push("/pacientes")
            }).catch(Error => {
                console.log(Error);
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi possível registrar sua consulta',
                    timer: 4000,
                })
            })
        }
    },
    mounted() {
        // Limpar o CPF do sessionStorage após uso
        console.log(sessionStorage.getItem('nome') || '');
        console.log(sessionStorage.getItem('cpf') || '');
        try {
            const data = require('@/config/profissionais.json');
            this.especialidades = data.profissionais;
            console.log(this.especialidade)
        } catch (error) {
            console.error('Erro ao carregar as especialidades:', error);
        }
    }
}
</script>