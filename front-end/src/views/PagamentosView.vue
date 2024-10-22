<template>
    <div>
        <Sidebar />
    </div>
    <div class="main-content_pagamentos">
        <h1>Pagamentos</h1>
        <div class="container_pagamentos" v-for="(pagamentos, mesAno) in pagamentos" :key="mesAno">
            <!-- Itera sobre os pagamentos por mês e ano -->
            <div>
                <h2>{{ formatarMesAno(mesAno) }}</h2>
                <table class="tabela_pagamentos">
                    <thead>
                        <tr>
                            <th>Nome do Paciente:</th>
                            <th>Data:</th>
                            <th>Registrado por:</th>
                            <th>Valor:</th>
                            <th>Tipo de pagamento:</th>
                            <th>Metodo:</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pagamento in pagamentos" :key="pagamento.id">
                            <td>{{ pagamento.paciente }}</td>
                            <td>{{ formatDate(pagamento.Data) }}</td>
                            <td>{{ pagamento.profissional.nome }}</td>
                            <td> R$ {{ pagamento.pagamento.toFixed(2) }}</td>
                            <td>{{ pagamento.tipo_pagamento }}</td>
                            <td>{{ pagamento.metodo }}</td>
                            <button @click="editarPagamento(pagamento.id, pagamento.pagamento.toFixed(2), pagamento.paciente, pagamento.tipo_pagamento, pagamento.metodo)" class="btn_editarpag">Editar</button>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" class="btn-pdf" @click="gerarPdf(mesAno)">Gerar PDF</button>

            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #E7FAFF;
}

.main-content_pagamentos {
    margin-left: 250px;
    padding: 20px;
}

h1 {
    color: #84E7FF;
}

h2 {
    color: #D9D9D9;
    margin-top: 0;
}

.container_pagamentos {
    background-color: white;
    padding: 20px;
    border: 1px solid #84E7FF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;
}

.tabela_pagamentos,
th,
td {
    border-collapse: collapse;
    width: 100%;
    padding: 10px;
    text-align: left;
    border: 1px solid #D9D9D9;
    color: #7E7E7E
}

.btn-pdf {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
}
table thead {
    background-color: #ffffff;
}
.btn_editarpag{
    background-color: #F5F5F5;
    border: 1px solid #D9D9D9;
    cursor: pointer;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;

}
@media (max-width: 768px) {
    .main-content_pagamentos {
        margin-left: 0;
    }

    .tabela_pagamentos, th, td {
        font-size: 7px;
        padding: 4px;
    }

    .btn-pdf {
        font-size: 14px;
        /* Ajusta o botão para telas menores */
    }
    .btn_editarpag{
        background-color: #F5F5F5;
        border: 1px solid #D9D9D9;
        cursor: pointer;
        color: #7E7E7E;
        font-family: 'Montserrat', sans-serif;
        font-size: 10px;
    }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/store';
import Axios from 'axios';
import { formatDate, formatarMesAno } from '../utils/formatarData';
import Swal from 'sweetalert2';

export default {
    name: 'pagamentos',
    components: {
        Sidebar
    },
    setup() {
        const store = useAuthStore()
        return {
            store
        }
    },
    data() {
        return {
            formatDate,
            formatarMesAno,
            metodoPagamento: '',
            tipoPagamento: '',
            novo_val: '',
            pagamentos: [],
            pagamentosPorMes: {} // Armazena os pagamentos agrupados por mês

        }
    },
    methods: {

        async editarPagamento(id, valor, paciente, tipo_pagamento, metodo){            
            const { value: inputValue } = await Swal.fire({
                title: "Digite o valor",
                input: "text",
                inputValue: valor,
                inputLabel: `Digite o novo valor que você deseja adicionar a: R$ ${valor}`,
            });
            const novo_valor = inputValue;
            const { value: novo_paciente } = await Swal.fire({
                title: "Pagamento de: ",
                input: "text",
                inputValue: paciente,
                inputLabel: `Digite o novo paciente para: ${paciente}` ,
            });
            const { value: novo_tipo } = await Swal.fire({
                title: `Tipo de pagamento para: ${tipo_pagamento}`,
                input: "select",
                inputOptions: {
                    Pagamentos: {
                        saida: "Pagamento de saida",
                        entrada: "Pagamento de entrada",
                        externo: "Paciente externo",
                    },
                }
            });
            const { value: novo_metodo } = await Swal.fire({
                title: `Novo método de pagamento para: ${metodo}`,
                input: "select",
                inputOptions: {
                    Pagamentos: {
                        Dinheiro: "Dinheiro",
                        PIX: "PIX",
                        Cartao: "Cartão de Crédito | Débito",
                    },
                }
            });

            if(novo_metodo === 'Cartao'){
                this.metodoPagamento = 'Cartão de Crédito | Débito'
            }
            else{
                this.metodoPagamento = novo_metodo
            }
            if(novo_tipo === 'externo'){
                this.tipoPagamento = 'Pagamento de entrada'
                const valor = parseFloat(novo_valor);
                this.novo_val = valor * 0.2;
                console.log(this.novo_val)
            }
            else if(novo_tipo === 'entrada'){
                this.tipoPagamento = 'Pagamento de entrada'
                this.novo_val = parseFloat(novo_valor)
            }
            else{
                this.tipoPagamento = 'Pagamento de saida'
                this.novo_val = parseFloat(novo_valor)
            }

            console.log(id, this.novo_val, novo_paciente, this.tipoPagamento, this.tipoPagamento)
            try{
                const token = this.store.token;
                Axios.post("https://clinica-maria-luiza-copia-fqrm.onrender.com/alterar/pagamento", {
                    pagar: {
                        id: id,
                        valor: this.novo_val,
                        paciente: novo_paciente,
                        tipo_pagamento: this.tipoPagamento,
                        metodo: this.metodoPagamento
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Alteração do pagamento registrado com sucesso',
                    text: 'Seu pagamento foi alterado com sucesso!',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
                this.getPagamentos()
            }
            catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Erro na alteração do seu pagamento',
                    text: 'Tente novamente depois',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }
        },
        async getPagamentos() {
            const token = this.store.token
            await Axios.get(`https://clinica-maria-luiza-copia-fqrm.onrender.com/pagamentos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then(response => {
                this.pagamentos = response.data.pagamento
                console.log(this.pagamentos)
            }).catch(error => {
                console.error(error.data)
            })
        },
        async gerarPdf(data){
            const ano_pdf = data.split('-')[0]; // Divide a data e pega a parte do mês
            const mes_pdf = data.split('-')[1]; // Divide a data e pega a parte do mês
            const mes =  parseInt(mes_pdf, 10); // Retorna o mês como número inteiro
            const ano = parseInt(ano_pdf, 10);

            Swal.fire({
                title: 'Aguarde...',
                text: 'Estamos gerando o PDF.',
                timer: 3000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await Axios({
                url: `https://clinica-maria-luiza-copia-fqrm.onrender.com/pdf/pagamentos`,  // Altere a URL conforme necessário
                method: 'POST',
                responseType: 'blob',
                data: {
                    mes: mes,  // Enviando email no corpo da requisição
                    ano: ano       // Enviando o mês selecionado
                }
            }).then(response => {
                // Crie um URL para o blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Relatório de pagamentos.pdf`); // Nome do arquivo
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao gerar PDF',
                timer: 4000,
            })
            console.error('Erro ao baixar o PDF:', error)});
        }
    },
    mounted() {
        this.getPagamentos()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            try {
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
            catch {
                console.log("Erro")
            }

        })
    }

}
</script>