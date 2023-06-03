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
