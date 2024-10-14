<template>
    <Sidebar />
    <div class="main-content_registrar_pagamentos">
        <div class="container_registrarpagamento">
            <h1>Realizar Pagamento</h1>
            <form @submit.prevent="realizarpagamento">
                <div class="form-group">
                    <label for="tipodepagamento">Tipo de Pagamento:</label>
                    <select id="tipodepagamento" name="tipodepagamento" v-model="tipo_pagamento" required>
                        <option value="Pagamento de entrada">Pagamento de Entrada</option>
                        <option value="Paciente externo">Paciente externo</option>
                        <option value="Pagamento de saida">Pagamento de Saida</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nome">Nome do Paciente:</label>
                    <input type="text" id="nome_paciente" name="nome" v-model="paciente" required>
                </div>
                <div class="form-group">
                    <label for="valorpagamento">Valor do Pagamento (R$):</label>
                    <input type="number" id="valor_pagamento" name="valorpagamento" v-model="valor" step="0.01" required>
                </div>

                <div class="form-group">
                    <label for="metodo_de_pagamento">Método de Pagamento:</label>
                    <select id="metododepagamento" name="metodo_de_pagamento" v-model="metodo" required>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="PIX">PIX</option>
                        <option value="Cartão de Crédito | Débito">Cartão de Crédito | Débito</option>

                    </select>
                </div>

                <button type="submit" class="btn_realizarpagamento">Finalizar Pagamento</button>
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

.main-content_registrar_pagamentos {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.container_registrarpagamento {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_registrarpagamento h1 {
    color: #D9D9D9;
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
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

#data_pagamento,
#metododepagamento,
#tipodepagamento {
    font-family: 'Montserrat', sans-serif;
}

.btn_realizarpagamento {
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

.btn_realizarpagamento:hover {
    background-color: #E7FAFF;
}

@media (max-width: 768px) {
    .main-content_registrar_pagamentos {
        margin-left: 0;
        padding: 10px;
    }

    .container_registrarpagamento {
        padding: 15px;
        /* Diminui o padding */
    }

    form {
        gap: 15px;
        /* Ajusta o espaço entre os campos */
    }

    .btn_realizarpagamento {
        margin-top: 10px;
        /* Ajusta a margem superior */
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store';
import Axios from 'axios';
import Swal from 'sweetalert2'
import router from '@/router';

export default {
    name: 'registrarconsulta',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore();
        return {
            store,
        }
    },
    data() {
        return {
            valor: '',
            paciente: '',
            tipo_pagamento: '',
            metodo: ''
        }
    },
    methods: {
        async realizarpagamento() {
            console.log("Tentando realizar pagamento com os dados:", {
                valor: this.valor,
                paciente: this.paciente,
                tipo_pagamento: this.tipo_pagamento,
                metodo: this.metodo
            });

            try {
                if(this.tipo_pagamento === 'Paciente externo'){
                    this.tipo_pagamento = 'Pagamento de entrada'
                    const valor = parseFloat(this.valor);
                    this.valor = valor * 0.2;
                }
                const profissionalId = this.store.usuario.usuario.email;
                const token = this.store.token;
                const valorFloat = parseFloat(this.valor);

                await Axios.post("https://clinica-maria-luiza-copia.onrender.com/registrar/pagamentos", {
                    pagar: {
                        profissionalId: profissionalId,
                        valor: valorFloat,
                        paciente: this.paciente,
                        tipo_pagamento: this.tipo_pagamento,
                        metodo: this.metodo
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Pagamento registrado',
                    text: 'Seu pagamento foi registrado com sucesso!',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
                router.push('/dashboard')
            } catch (error) {
                console.error("Erro ao realizar pagamento:", error);
                Swal.fire({
                icon: 'error',
                title: 'Pagamento não registrado',
                text: 'Ops, algo de errado ao registrar seu pagamento',
                timer: 4000,
            })
            }
        }
    }
}
</script>