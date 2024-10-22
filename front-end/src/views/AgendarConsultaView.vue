<template>
    <Sidebar />
    <div class="main-content_agendar">
        <div class="container_agendarconsulta">
            <h1>Agendar Consulta</h1>
            <form @submit.prevent="agendarconsulta">
                <div class="form-group observacao">
                    <label for="observacao_agendarconsulta">Agendamento:</label>
                    <textarea id="observacao_agendarconsulta" rows="1" v-model="agendamento"></textarea>
                </div>
                <div class="form-group">
                    <label for="nome_paciente">Paciente:</label>
                    <input type="text" id="nome_paciente" v-model="buscar" @input="searchpacientes"
                        @focus="sugestoes = true" @blur="hideSuggestions" autocomplete="off"/>
                    <ul v-if="sugestoes && filtrarPacientes.length">
                        <li v-for="paciente in filtrarPacientes" :key="paciente.id"
                            @mousedown.prevent="selecionarPaciente(paciente)">
                            {{ paciente.nome }}
                        </li>
                    </ul>
                </div>
                <div class="form-group">
                    <label for="datadaconsulta">Data:</label>
                    <input type="datetime-local" id="data_consulta" name="datadaconsulta" v-model="data">
                </div>
                <div class="form-group especialidade">
                    <label for="especialidade">Especialidade:</label>
                    <select id="especialidade" name="especialidade" v-model="profissional" required>
                        <option v-for="profissional in profissionais" :key="profissional.email" :value="profissional.email">
                            {{ profissional.especialidade }} - {{ profissional.nome }} 
                        </option>
                        
                    </select>
                </div>
                <div class="form-group observacao">
                    <label for="observacao_agendarconsulta">Observação:</label>
                    <textarea id="observacao_agendarconsulta" rows="4"></textarea>
                </div>

                <button type="submit" class="agendarconsulta_btn" click="agendarconsulta">Agendar</button>
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

.main-content_agendar {
    margin-left: 250px;
    padding: 20px;
    justify-content: center;
}

.container_agendarconsulta {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container_agendarconsulta h1 {
    color: #84E7FF;
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

.form-group input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.form-group textarea {
    padding: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    color: #7E7E7E;
    resize: none;
}

.observacao {
    grid-column: 1 / -1;
}

.especialidade {
    grid-column: 1 / -1;
}

.agendarconsulta_btn {
    grid-column: 1 / -1;
    padding: 10px;
    background-color: #E7FAFF;
    border: 1px solid #84E7FF;
    border-radius: 4px;
    color: #7E7E7E;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.agendarconsulta_btn:hover {
    background-color: #E7FAFF;
}
ul {
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 65px;
  padding-left: 0;
  list-style-type: none;
  background-color: #fff;
  position: absolute;
  width: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

#data_consulta,
#especialidade,
#horario {
    font-family: 'Montserrat', sans-serif;
}
@media (max-width: 768px) {
    .main-content_agendar {
        margin-left: 0;
        padding: 15px;
    }

    .container_agendarconsulta {
        padding: 15px;
    }

    form {
        grid-template-columns: 1fr;
    }
}

</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
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
        const store = useAuthStore() //Importação da função do Store.js
        return {
            store
        }
    },
    data() {
        return {
            agendar: '',
            notas: '',
            data: '',
            buscar: '',
            agendamento: '',
            filtrarPacientes: [],
            selecionado: '',
            profissional: '',
            profissionais: [], // Este array deve ser preenchido com os dados dos profissionais
            pacientes: [], // Este array deve ser preenchido com os dados dos pacientes
            sugestoes: false
        }
    },
    methods: {
        searchpacientes() {
            this.filtrarPacientes = this.pacientes.filter(paciente =>
                paciente.nome.toLowerCase().includes(this.buscar.toLowerCase())
            );
        },
        selecionarPaciente(paciente) {
            this.buscar = paciente.nome;
            this.selecionado = paciente.cpf;
            this.sugestoes = false;
        },
        selecionarPaciente(paciente) {
            this.buscar = paciente.nome;
            this.selecionado = paciente.cpf;
            this.sugestoes = false;
        },
        hideSuggestions() {
            setTimeout(() => {
                this.sugestoes = false;
            }, 200);
        },
        async agendarconsulta() {
            const token = this.store.token
            console.log(this.profissional)
            Swal.fire({
                title: 'Aguarde...',
                text: `Agendando consulta`,
                timer: 3000,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            })
            await Axios.post(`https://clinica-maria-luiza-copia-fqrm.onrender.com/cadastrar/agendamento`, {
                agenda: {
                    agendamento: this.agendamento,
                    data: this.data,
                    agendar: this.agenda,
                    notas: this.notas,
                    profissional: this.profissional,
                    paciente: this.selecionado
                }
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
                    title: 'Agendamento realizado com sucesso!',
                    timer: 4000,
                })
                router.push('/dashboard')
            }).catch(Error => {
                console.error(Error);
                Swal.fire({
                    icon: 'erro',
                    title: 'Erro ao registrar agendamento',
                    timer: 4000,
                })
            })
        }
    },
    mounted() {
        ///profissionais/agendar
        const token = this.store.token
        Axios.get("https://clinica-maria-luiza-copia-fqrm.onrender.com/pacientes", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            this.pacientes = response.data.pacientes
        }).catch(Error => {
            console.error(Error)
        })
        Axios.get("https://clinica-maria-luiza-copia-fqrm.onrender.com/profissionais/agendar", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            this.profissionais = response.data.profissionais
        }).catch(Error => {
            console.error(Error)
        })
    }
}

</script>