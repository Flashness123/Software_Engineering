<script setup lang="ts">

import fullcalendar_popup from './components/fullcalendar.vue'
// import auth_button from './components/vue/login.vue'
import auth_button from './components/login.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import SimpleDialog from './components/SimpleDialog.vue'

const { reveal, onConfirm } = createConfirmDialog(SimpleDialog, { question: 'Are you sure you want to hide the logo?'})

onConfirm(() => {
  console.log('Confirmed!')
})

</script>

<template>
  <auth_button />
  <fullcalendar_popup />
  
  <button @click="reveal">Hide Logo</button>
  <DialogsWrapper />
</template>
