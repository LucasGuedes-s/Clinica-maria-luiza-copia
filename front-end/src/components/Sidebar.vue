<template>
  <div>
    <div class="sidebar-toggle" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="25" fill="#000000" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    </div>
    <div :class="['sidebar', { active: isSidebarActive }]">
      <img src="img.girafas.png" alt="Logo">
      <router-link to="/dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
        </svg>
        Dashboard
      </router-link>
      <router-link to="/profissionais">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill"
          viewBox="0 0 16 16">
          <path
            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        </svg>
        Profissionais
      </router-link>
      <router-link to="/pacientes">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
        </svg>
        Pacientes
      </router-link>
      <router-link to="/agendarconsulta">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-calendar-check" viewBox="0 0 16 16">
          <path
            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>
        Agendamentos
      </router-link>
      <router-link to="/pagamentos">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin"
          viewBox="0 0 16 16">
          <path
            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        </svg>
        Pagamentos
      </router-link>
      <button class="logout-button" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
        </svg>
        Sair
      </button>
    </div>
  </div>
</template>
<style>
.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    padding-top: 20px;
    text-align: center;
    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.10);
}

.sidebar img {
    width: 150px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.sidebar a {
    padding: 20px 15px;
    text-decoration: none;
    font-size: 16px;
    text-align: left;
    color: #7E7E7E;
    display: block;
    margin-left: 30px;
}

.sidebar a:hover {
    color: #84E7FF;
}

/* Botão para abrir o sidebar no celular */
.sidebar-toggle {
    position: relative;
    top: 20px;
    left: 15px;
    color: #84E7FF;
    border: none;
    cursor: pointer;
    z-index: 1001;
}

.sidebar-toggle.active {
    left: 230px;
}
.logout-button {
  justify-content: center;
  position: absolute;
  bottom: 30px;
  font-size: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex; /* Alinhamento com flexbox */
  align-items: center; /* Alinha verticalmente */
  background-color: transparent; /* Sem fundo */
  color: #7E7E7E;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 80%;
  text-align: center;
}

.logout-button svg {
  margin-right: 8px; /* Espaço entre o ícone e o texto */
}

.logout-button:hover {
  color: #e53935; /* Cor ao passar o mouse */
}
@media (min-width: 768px) {
    .sidebar-toggle {
        display: none;
    }
}

@media (max-width: 768px) {
  .sidebar-toggle svg {
    width: 20px;
  }

  .logout-button {
    bottom: 80px;
  }
  
  .sidebar {
        display: block;
        position: fixed;
        left: -250px;
        top: 0;
        width: 200px;
        height: 100vh;
        transition: left 0.3s ease;
        z-index: 1000;
    }

    .sidebar.active {
        left: 0;
    }

    .sidebar a {
        justify-content: flex-start;
        padding: 15px;
        margin-left: 10px;
    }
    .sidebar img {
        width: 60px;
        margin-bottom: 15px;
    }
}

</style>

<script>
import { useAuthStore } from '@/store'; 

export default {
    data() {
        return {
        isSidebarActive: false
            };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarActive = !this.isSidebarActive;
        },
        async logout() {
          const authStore = useAuthStore();
          authStore.logout(); // Chama a função logout da store

          this.$router.push('/login');
        }
    },
};
</script>