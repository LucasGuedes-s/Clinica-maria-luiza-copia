<template>
   <div class="container_login">
        <div class="esquerda_login">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita_login">
            <form class="login_form" @submit.prevent="login">
                <h1>Realizar login</h1>
                <label for="email">E-mail</label>
                <input type="text" v-model="email" placeholder="Digite o seu e-mail">
                <label for="senha">Senha</label>
                <input type="password" v-model="senha" placeholder="Digite a sua senha">
                <div class="button_container">
                    <button type="submit" class="btn_profissional" click="login">Entrar como profissional</button>
                    <router-link to="/loginpaciente" class="btn_paciente">Entrar como paciente</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
body {
    background-color: rgb(252, 252, 252);
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
form {
    display: block;
}
.container_login {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    color: #D9D9D9;
}

.esquerda_login {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.direita_login {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login_form {
    width: 80%;
}

.login_form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login_form label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.login_form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
}

.login_form input::placeholder {
    color: #D9D9D9;
    font-family: 'Montserrat', sans-serif;
}

.button_container {
    display: flex;
    justify-content: space-between;
}

button,
.btn_paciente {
    width: 48%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    text-align: center;
    display: inline-block;
    text-decoration: none; /* Ensure no underline */
    color: inherit; /* Inherit text color */
}

.btn_profissional {
    background-color: #E7FAFF;
    border: 1px solid #86E7FF;
}

.btn_profissional:hover {
    background-color: #86E7FF;
}

.btn_paciente {
    background-color: #FBE9EB;
    border: 1px solid #FAC6CA;
}

.btn_paciente:hover {
    background-color: #FAC6CA;
}

@media (max-width: 768px) {
    .container_login {
        flex-direction: column;
    }
    
    .esquerda_login img {
        width: 80%;
        height: auto;
    }
    
    .esquerda_login,
    .direita_login {
        width: 100%;
        height: auto; 
    }
    
    .login_form {
        width: 90%;
        margin: 0 auto;
    }
    
    .login_form input {
        padding: 8px; 
        font-size: 14px; 
    }
    
    .button_container {
        flex-direction: column; 
    }
    
    .button_container button,
    .button_container .btn_paciente {
        width: 100%;
        font-size: 14px;
        padding: 8px; 
        margin-bottom: 15px;
    }
}
</style>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store.js'
import router from '@/router';

export default {
    name:'LoginView',
    //O gancho setup() serve como ponto de entrada para usar a API de Composição em componentes. 
    setup(){
        const store = useAuthStore() //Importação da função do Store.js
        return{
            store
        }
    },
    data(){
        return{
            email:'',
            senha:'',
            token: []
        }
    },
methods:{
    async login(){
        await Axios.post("http://localhost:3000/user/login", {
            usuario:{
                email:this.email,
                senha:this.senha
            }
        }).then(response =>{
            const token = response.headers.authorization.split(' ')[1];
            const user = response.data;
            this.store.login(user, token);
            router.push('/dashboard')
        }).catch(Error =>{
            console.error(Error);
            Swal.fire({
                icon: 'error',
                title: 'Usuário ou senhas incorretos',
                timer: 4000,
            })
        })
    }
}
    }

</script>