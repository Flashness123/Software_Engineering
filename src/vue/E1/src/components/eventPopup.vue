<template>
    <div v-if="show" class="popup">
      <h2>{{ event.title }}</h2>
      <!-- Add more details here -->
      <button @click="close">Close</button>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: ['show', 'event'],
    methods: {
      close() {
        this.$emit('close');
      }
    }
  });
  </script>