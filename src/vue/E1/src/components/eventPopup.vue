<template>
    <div class="popup">
      <!-- Add more details here -->
      <button @click="close">Close</button>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    // props: ['show', 'event'],
    methods: {
      close() {
        this.$emit('close');
      }
    }
  });
  </script>