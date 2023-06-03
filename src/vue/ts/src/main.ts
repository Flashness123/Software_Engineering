import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ConfirmDialog from 'vuejs-confirm-dialog'
import store from './store/store.js'
import GoogleSignInPlugin from 'vue3-google-signin'
// const app = createApp(App);
// app.use(ConfirmDialog);
// app.mount('#app');
const app = createApp(App);
app.use(GoogleSignInPlugin, {
    clientId: '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com',
  });
app.use(ConfirmDialog)
app.use(store)
app.mount('#app')