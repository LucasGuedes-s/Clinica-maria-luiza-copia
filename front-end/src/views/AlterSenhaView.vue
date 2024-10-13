<template>
    <div class="container_senha">
        <div class="esquerda-senha">
            <img src="../assets/img.girafas.png" alt="" srcset="">
        </div>
        <div class="direita-senha">
            <form class="senha-form" @submit.prevent="Altersenha">
                <h1>Alterar Senha</h1>
                <label for="email">Digite seu E-mail</label>
                <input type="email" v-model="email" placeholder="Digite o seu e-mail">
                <label for="senha">Nova senha</label>
                <input type="password" v-model="senha" placeholder="Digite a sua nova senha">
                <label for="senha">Repita a senha</label>
                <input type="password" v-model="senha_2" placeholder="Digite a sua nova senha novamente">

                <button click="Altersenha" type="submit" class="btn">Alterar Senha</button>
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
form {
    display: block;
}
.container_senha {
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

.esquerda-senha {
    width: 40vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.direita-senha {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.senha-form {
    width: 80%;
}

.senha-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.senha-form label {
    display: block;
    margin-bottom: 8px;
    color: #D9D9D9;
}

.senha-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-sizing: border-box;
}

.senha-form input::placeholder {
    color: #D9D9D9;
    font-family: 'Montserrat', sans-serif;
}

.button {
    justify-content: space-between;
}

.senha-form button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

.btn {
    background-color: #FBE9EB;
    border: 1px solid #FAC6CA;
}

.btn:hover {
    background-color: #FAC6CA;
}
@media (max-width: 768px) {
    .container_senha {
        flex-direction: column;
    }

    .esquerda-senha, .direita-senha {
        width: 100%;
        height: auto;
    }

    .senha-form {
        width: 90%;
    }

    .esquerda-senha img {
        width: 90%;
        height: auto;
    }

    .senha-form input {
        margin-bottom: 20px; 
    }
}
</style>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store.js'
import router from '@/router';

export default {
    name: 'senhaView',
    //O gancho setup() serve como ponto de entrada para usar a API de Composição em componentes. 
    setup() {
        const store = useAuthStore() //Importação da função do Store.js
        return {
            store
        }
    },
    data() {
        return {
            email: '',
            senha: '',
            senha_2: ''
        }
    },
    methods: {
        async Altersenha() {
            if (this.senha != this.senha_2) {
                Swal.fire({
                    icon: 'error',
                    title: 'As senhas não condizem',
                    timer: 4000,
                })
            }
            else {
                const nova_senha = this.senha
                await Axios.post("https://clinica-maria-luiza.onrender.com/user/alterar/senha", {
                    usuario: {
                        email: this.email,
                        nova_senha: nova_senha,
                    }
                }).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Senha alterada com sucesso',
                        timer: 4000,
                    })
                    router.push('/login')
                }).catch(Error => {
                    console.error(Error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível alterar sua senha',
                        timer: 4000,
                    })
                })
            }
        }
    }
}

</script>