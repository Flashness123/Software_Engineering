# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### install and run
Creating the project:
    npm create vite@latest
    --> vue, javascript

installing npm libs:
npm install @fullcalendar/core 
npm install @fullcalendar/vue3
...npm install (((all used fullcalendar libs)))
npm install -S vue3-google-signin
npm install vuex@next --save
npm i vuejs-confirm-dialog




npm install
npm run dev


#### Login Möglichkeiten

Unser Login.js können wir nicht in vue übernehmen da die alten Funktionen depricated sind und funktionieren seit 30.03.2023 nicht mehr.
Details dazu: https://developers.google.com/identity/gsi/web/guides/migration?hl=de#popup-mode_1

Stattdessen kann man:
1- Dieses Code in index HTML:
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <div
      id="g_id_onload"
      data-client_id="966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com"
      data-callback="handleCredentialResponse"
    ></div>
    <div class="g_id_signin" data-type="standard"></div>

2- login.vue mit vue3-google-signin implementieren
Details dazu: https://vue3-google-signin.syetalabs.io/guide/
Ich habe mich dafür entschieden die Variante mit useTokenClient zu implementieren.
