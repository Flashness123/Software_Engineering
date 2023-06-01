import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ConfirmDialog from 'vuejs-confirm-dialog'
import { store } from './store/index'
// const app = createApp(App);
// app.use(ConfirmDialog);
// app.mount('#app');

createApp(App).use(ConfirmDialog).use(store).mount('#app')