<template>
    <Sidebar />
    <div class="main_content_paciente">
        <h1>Pacientes</h1>
        <div class="search_cadastrar">
            <input type="text" id="search-input" placeholder="Nome do paciente..." v-model="pesquisa">
            <RouterLink to="/cadastrarpaciente"><button>Cadastrar</button></RouterLink>
        </div>
        <div class="container_paciente" v-for="usuario in filteredPacientes" :key="usuario.cpf">
            <div class="info">
                <img :src="usuario.foto" @click="editarDados(usuario.cpf, usuario.email)">
                <div class="textos">
                    <p>Nome: {{ usuario.nome }}</p>
                    <p>Telefone: {{ usuario.telefone }}</p>
                    <p v-if="usuario.paciente_dados && usuario.paciente_dados.length > 0">Alergico a: {{
                        usuario.paciente_dados[0].alergicos }}</p>
                </div>

            </div>
            <div class="botoes_div">
                <button class="evolucao_btn" @click="cadastrarInformacoes(usuario.cpf)"
                        v-if="usuario.paciente_dados.length === 0">Registrar dados</button>

                <button class="evolucao_btn" v-if="usuario.paciente_dados.length > 0"
                    @click="evolucao(usuario.cpf)">Evolução</button>
                <button class="registroaba_btn" v-if="usuario.paciente_dados.length > 0"
                    @click="aba(usuario.cpf, usuario.nome,)">Registro Aba</button>
                <RouterLink to="/registrarconsulta"><button class="registrar_btn"
                        @click="consulta(usuario.cpf, usuario.nome)">Registrar consultas</button></RouterLink>
                <button class="histconsultas_btn" @click="historico(usuario.cpf)">Hist. consultas</button>
                <button class="laudosconsultas_btn" @click="Adicionarlaudos(usuario.cpf)">Anexos</button>

            </div>
        </div>
    </div>
</template>

<style>
body {
    margin: 0;
    background-color: #E7FAFF;
    font-family: 'Montserrat', sans-serif;
}

.main_content_paciente {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

.search_cadastrar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
}

input {
    width: 90%;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.search_cadastrar button {
    padding: 10px 50px;
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}

.container_paciente {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    flex-direction: row;
    /* Organiza itens em linha */
    align-items: flex-start;
    /* Alinha itens ao topo */
    position: relative;
    gap: 20px;
    /* Espaçamento entre a imagem e a info */
}

.container_paciente img {
    width: 165px;
    height: 170px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid #84E7FF;
}

.info {
    flex-grow: 1;
    display: inline-flex;
    color: #7E7E7E;
}

.textos {
    margin: 10px;
}

.botoes_div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
    /* Move os botões para a parte inferior */
    justify-content: flex-end;
    /* Alinha os botões à direita */
}

.evolucao_btn,
.registroaba_btn,
.histconsultas_btn,
.laudosconsultas_btn,
.registrar_btn {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #84E7FF;
    color: #7E7E7E;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    min-width: 120px;
}

.histconsultas_btn,
.laudosconsultas_btn {
    background-color: #E7FAFF;
}

@media (max-width: 768px) {
    .laudosconsultas_btn {
        display: none
    }

    .evolucao_btn,
    .registroaba_btn,
    .histconsultas_btn,
    .registrar_btn {
        padding: 8px 8px;
        min-width: auto;
    }

    .main_content_paciente {
        margin-left: 0;
        padding: 10px;
    }

    .search_cadastrar {
        flex-direction: row;
        /* Alinha lado a lado */
        align-items: center;
    }

    .textos {
        margin: 10px;
    }

    input {
        padding: 8px;
        font-size: 14px;
    }

    .search_cadastrar button {
        padding: 8px 16px;
        font-size: 14px;
        width: 100px;
        /* Largura fixa do botão */
    }

    .container_paciente {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .container_paciente img {
        width: 150px;
        height: 150px;
        margin-bottom: 10px;
        display: block;
    }

    .info {
        font-size: 12px;
        display: flex;
        text-align: left;
    }

    .botoes_div {
        gap: 5px;
        flex-wrap: inherit;
        justify-content: inherit;
    }

    .botoes_div button {
        padding: 5px;
        /* Ajuste o padding conforme a necessidade */
        font-size: 13px;
        /* Diminua o tamanho da fonte */
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { RouterLink } from 'vue-router';
import { storage } from '../firebase.js'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'pacientes',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        sessionStorage.removeItem('cpf');
        sessionStorage.removeItem('nome');
        sessionStorage.removeItem('email');

        return {
            store
        }
    },
    data() {
        return {
            pesquisa: '',
            paciente: [],
            laudo: null,
            laudos: [],
            cpf: null,
        }
    },
    methods: {
        async cadastrarInformacoes(cpf){
            sessionStorage.setItem('cpf', cpf);
            this.$router.push({ name: 'cadastrarinformacoes' });
        },
        async editarDados(cpf, email) {
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('email', email);

            this.$router.push({ name: 'editarDados' });
        },
        async pacientes() {
            const token = this.store.token
            Axios.get("https://clinica-maria-luiza-copia-fqrm.onrender.com/pacientes", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.paciente = response.data.pacientes
            }).catch(Error => {
                console.error(Error)
            })
        },
        async historico(cpf) {
            sessionStorage.setItem('cpf', cpf);
            this.$router.push({ name: 'historicodeconsulta' });
        },
        async aba(cpf, nome) {
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('nome', nome);

            this.$router.push({ name: 'registroaba' });
        },
        async evolucao(cpf) {
            sessionStorage.setItem('cpf', cpf);

            this.$router.push({ name: 'evolucao' });
        },
        async consulta(cpf, nome) {
            sessionStorage.setItem('cpf', cpf);
            sessionStorage.setItem('nome', nome);

            this.$router.push({ name: 'registrarconsulta' });
        },
        async Adicionarlaudos(cpf) {
            Swal.fire({
                title: 'O que você gostaria de fazer?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Subir Laudo',
                cancelButtonText: 'Ver Laudos',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.openUploadModal();
                    this.cpf = cpf
                } else if (result.isDismissed) {
                    sessionStorage.setItem('cpf', cpf);
                    this.$router.push({ name: 'laudos' });
                }
            });
        },

        async uploadFiles(files) {
            for (const file of files) {
                const uniqueFileName = uuidv4() + '_' + file.name;
                const storageRef = ref(storage, `laudos/${uniqueFileName}`);

                try {
                    const snapshot = await uploadBytes(storageRef, file);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    this.laudo = downloadURL
                    this.addLaudo()
                    Swal.fire({
                        toast: true,
                        position: 'top-end', // ou 'top-right', 'bottom-end', etc.
                        icon: 'success', // ou 'error', 'warning', 'info', 'question'
                        title: 'Fazendo o upload do laudo',
                        text: 'Fazendo o upload do laudo adicionado',
                        showConfirmButton: false,
                        timer: 3000, // Tempo em milissegundos antes de desaparecer
                        timerProgressBar: true
                    });

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível concluir',
                        text: 'Laudo não adicionado',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    console.error('Erro ao fazer upload:', error);
                }
            }
        },
        async addLaudo() {
            const token = this.store.token
            console.log(this.cpf, this.laudo)
            Axios.post("https://clinica-maria-luiza-copia-fqrm.onrender.com/paciente/laudos",
                {
                    cpf: this.cpf,
                    laudo: this.laudo
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Laudo adicionado com sucesso!',
                        text: 'Laudo adicionado com sucesso',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    this.cpf = null
                }).catch(Error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível concluir',
                        text: 'Laudo não adicionado',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                })
        },
        openUploadModal() {
            Swal.fire({
                title: 'Escolha o tipo de arquivo para fazer upload',
                input: 'select',
                inputOptions: {
                    image: 'Imagem (PNG)',
                    pdf: 'PDF',
                },
                inputPlaceholder: 'Selecione um tipo de arquivo',
                showCancelButton: true,
                confirmButtonText: 'Selecionar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    this.openFileInput(result.value);
                }
            });

        },
        openFileInput(fileType) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = fileType === 'image' ? 'image/*' : 'application/pdf';
            input.multiple = true; // Permite seleção de múltiplos arquivos
            input.onchange = (event) => {
                const files = event.target.files;
                if (files.length) {
                    this.uploadFiles(Array.from(files));
                }
            };
            input.click();
        },
    },
    mounted() {
        this.pacientes()
    },
    computed: {
        filteredPacientes() {
            return this.paciente.filter(paciente =>
                paciente.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
            );
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