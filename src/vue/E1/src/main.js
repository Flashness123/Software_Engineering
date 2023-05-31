import { createApp } from 'vue'
import './assets/styles/global.css'
import App from './App.vue'
import GoogleSignInPlugin from "vue3-google-signin"
import store from './store/index.js'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

const app = createApp(App);

app.use(GoogleSignInPlugin, {
  clientId: '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com',
});

app.use(ConfirmDialog);
app.use(store);
app.mount("#app");
