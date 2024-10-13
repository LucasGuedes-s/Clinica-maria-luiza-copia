<template>
    <Sidebar />
    <div class="main-content">
        <div class="container_cadastrarprof">
            <h1>Cadastrar Profissional</h1>
            <form @submit.prevent="cadastrarprofissional">
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome_funcionario" name="nome" v-model="nome" required>
                </div>

                <div class="form-group">
                    <label for="pix">PIX:</label>
                    <input type="text" id="pix" name="pix" v-model="pix">
                </div>
            
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email_prof" name="email" v-model="email"required>
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone_prof" name="telefone" v-model="telefone" required>
                </div>
            
                <div class="form-group">
                    <label for="especialidade">Especialidade:</label>
                    <select id="especialidade" name="especialidade" v-model="especialidade" required>
                        <option v-for="especialidade in especialidades" :key="especialidade" :value="especialidade">
                            {{ especialidade }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="especialidade">Permissões no sistema:</label>

                    <select id="permisssao" name="permissao" v-model="permissaoId" required>
                        <option>Administrador</option>
                        <option>Recepcionista</option>
                        <option>Profissional</option>
                    </select>
                </div>
            
                <div class="form-group selecionar">
                    <label for="imagem">Adicionar Imagem:</label>
                    <input type="file" id="imagem_prof" name="imagem" @change="handleFileUpload">
                </div>
                <button type="submit" class="cadastrar-btn" click="cadastrarprofissional">Cadastrar</button>
            </form>            
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
    justify-content: center;
}

.container_cadastrarprof {
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

.form-group input, select {
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
    .main-content {
        margin-left: 0;
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
    name: 'cadastrar_profissional',
    components:{
        Sidebar
    },
    setup(){
        const store = useAuthStore() //Importação da função do Store.js
        return{
            store
        }
    },
data(){
    return {
        nome: '',
        data_nascimento: '',
        email: '',
        telefone: '',
        pix: '',
        imagem: null,
        foto: null,
        especialidades: [],
        especialidade: '',
        permissao: null,
        permissaoId: null
    }
},
methods: {
    async handleFileUpload(event) {
        this.imagem = event.target.files[0];
    },
    async cadastrarprofissional(){
        const token = this.store.token
        try{
            // Gera um identificador único para a imagem
            const uniqueImageName = uuidv4() + '_' + this.imagem.name;
            // Cria uma referência para o armazenamento
            const storageRef = ref(storage, 'profissionais/' + uniqueImageName);
            // Faz o upload da imagem
            const snapshot = await uploadBytes(storageRef, this.imagem);
            // Obtém a URL pública da imagem
            this.foto = await getDownloadURL(snapshot.ref);
        }
        catch{
            this.foto = 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c'
        }
        if(this.permissaoId == 'Administrador'){
            this.permissao = 1
        }
        else if(this.permissaoId == 'Profissional'){
            this.permissao = 2
        }
        else if(this.permissaoId == 'Recepcionista'){
            this.permissao = 3
        }
        await Axios.post(`https://clinica-maria-luiza.onrender.com/cadastrar/profissional`, {
            usuario: {
                nome: this.nome,
                data_nascimento: this.data_nascimento,
                email: this.email,
                telefone: this.telefone,
                pix: this.pix,
                foto: this.foto,
                permissaoId: this.permissao,
                especialidade: this.especialidade
            },
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            Swal.fire({
                icon: 'success',
                title: 'Cadastrado com sucesso',
                timer: 8000,
                didOpen: () => {
                    Swal.showLoading();
                }
            }),
            router.push("/profissionais")
        ).catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'erro',
                title: 'Não foi possível realizar o cadastro',
                timer: 6000,
            })
        })
    }
},

mounted() {
  try {
    const data = require('@/config/profissionais.json');
    console.log(data)
    this.especialidades = data.profissionais;
    console.log(this.especialidade)
  } catch (error) {
    console.error('Erro ao carregar as especialidades:', error);
  }
},
beforeRouteEnter(to, from, next) {
        next(vm => {
            try{
                const authStore = useAuthStore();
                const userPermissions = authStore.getUser.usuario.permissao; // Obtém as permissões do usuário
                const requiredPermission = 1;
                
                if (!vm.store.isAuthenticated) {
                    vm.$router.push('/login')
                }
                else if (userPermissions != requiredPermission) {
                    vm.$router.push('/unauthorized'); // Redireciona para uma página de acesso negado
                }
            }
            catch{
                console.log("Erro")
            }

        })
    }

}
</script>