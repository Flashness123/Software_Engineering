<!-- 
/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
  * This is the main component, which is used to display the other components
  *
  * It also uses the fullcalendar component, which is defined here:
  * https://fullcalendar.io/docs/vue
  *
  * It also uses the vue3-google-signin component, which is defined here:
  * https://vue3-google-signin.syetalabs.io/
 */
 -->
<script setup lang="ts">
import fullcalendar_popup from './components/fullcalendar.vue'
import auth_button from './components/login.vue'
import createEventElement from './components/createEventElement.vue';
import searchEventsElement from './components/searchEvents.vue';
</script>

<template>
  <auth_button />
  <fullcalendar_popup />
  <createEventElement />
  <searchEventsElement />
</template>
