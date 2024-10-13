<template>
     <div class="container_error">
        <img src="../assets/girafas.png" alt="Imagem de girafas">
        <h1>Acesso não autorizado!</h1>
        <h2>Você não tem permissão para acessar a página solicitada.</h2>
        <div class="button-container">
            <button class="btn" @click="voltar">Voltar</button>
            <button class="btn" @click="login">Login</button>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    align-items: center;
    background-color: #E7FAFF;
}

.container_error{
    width: 90vw;
    height: 90vh;
    background-color: #ffffff;
    margin: 30px auto;
    border: 1px solid #84E7FF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
    overflow: hidden;
}

img {
    max-width: 320px;
    height: auto;
    margin-bottom: 20px; /* Espaço abaixo da imagem */
}

h1 {
    color: #D9D9D9;
    width: 40%;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    margin: 10px 0; /* Margem acima e abaixo do h1 */
    padding: 5px;
}

h2 {
    color: #D9D9D9;
    margin: 10px; /* Margem acima e abaixo do h2 */
}

.button-container {
    display: flex;
    gap: 20px; /* Espaço entre os botões */
    width: 40%;
    margin-top: 10px; /* Margem superior para os botões */
}

.btn {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    color: #7E7E7E;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 5px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .container {
        width: 90%;
        padding: 15px;
        box-sizing: border-box; /* Garante que o padding esteja dentro da largura */
    }

    img {
        max-width: 180px; /* Reduz a imagem em telas menores */
    }

    h1 {
        font-size: 14px;
        width: 90%;
    }

    h2 {
        font-size: 14px;
        margin: 5px 0;
    }

    .button-container {
        flex-direction: column;
        gap: 10px;
        width: 90%;
    }

    .btn {
        font-size: 12px;
        padding: 10px;
        margin-top: 10px;
    }
}

</style>
<script>
import router from '@/router';

export default {
    methods: {
        voltar() {
            router.push('/dashboard')
        },
        login() {
            router.push('/login')
        }
    }
}
</script>