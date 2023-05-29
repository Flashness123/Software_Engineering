import { createApp } from 'vue'
import './components/css/style.css'
import App from './App.vue'
// import GoogleSignInPlugin from "vue3-google-signin"

const app = createApp(App);

// app.use(GoogleSignInPlugin, {
//   clientId: '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com',
// });


app.mount("#app");
