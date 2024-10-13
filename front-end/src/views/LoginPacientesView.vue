<template>
    <div class="container_loginpaciente">
        <div class="esquerda_login">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita_login">
            <form class="login_paciente" @submit.prevent="login">
                <h1>Histórico de consulta</h1>
                <label for="email">E-mail ou CPF:</label>
                <input type="text" name="email" placeholder="Digite o seu e-mail ou CPF" v-model="usuario">
                <div class="button-container">
                    <button type="submit" class="btn-consultar" click="login">Consultar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.container_loginpaciente {
    width: 100vw;
    height: 100vh;
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

.login_paciente {
    width: 80%;
}

.login_paciente h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login_paciente label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.login_paciente input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.login_paciente button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

.btn-consultar {
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
}

.btn-consultar:hover {
    background-color: #E7FAFF;
}

@media (max-width: 768px) {
    .esquerda_login img {
        width: 80%;
        height: auto;
    }

    .container_loginpaciente {
        flex-direction: column;
    }

    .esquerda_login,
    .direita_login {
        width: 90%;
        height: auto;
    }

    .direita_login {
        padding: 20px;
    }

    .login_paciente {
        width: 100%;
    }
}
</style>
<script>
import Axios from 'axios';
import Swal from 'sweetalert2'
import router from '@/router';

export default {
    data() {
        return {
            usuario: '',
        }
    },
    methods: {
        async login() {
            const id = this.usuario
            
            await Axios.get(`https://clinica-maria-luiza.onrender.com/pacientes/login/${id}`
            ).then(response => {
                console.log(response.data)
                sessionStorage.setItem('cpf', response.data.paciente.cpf);
                router.push('/cosultasPacientes')
            }).catch(error =>{
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Paciente não encontrado, verifique o CPF ou e-mail digitado',
                    timer: 4000,
                });
            })
        }
    }
}

</script>