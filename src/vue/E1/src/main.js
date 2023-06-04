
/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * This is the main entry point for the app, where the Vue app is created and mounted
 * 
 * for more info, see the Vue.js docs:
 * https://v3.vuejs.org/guide/introduction.html
 * 
 */

import { createApp } from 'vue'
import './assets/styles/global.css'
import App from './App.vue'
import GoogleSignInPlugin from "vue3-google-signin"
import store from './store/index.js'

const app = createApp(App);

app.use(GoogleSignInPlugin, {
  clientId: '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com',
});
app.use(store);

app.mount("#app");
