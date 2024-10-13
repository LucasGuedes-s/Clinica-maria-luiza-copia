import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './store';

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

const authStore = useAuthStore();
authStore.loadFromLocalStorage();