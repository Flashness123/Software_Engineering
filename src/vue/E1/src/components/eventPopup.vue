<template>
  <dialog id="eventDialog">
    <div class="dialog-header">
      <h3>Event</h3>
      <button class="close" @click="close">X</button>
    </div>
    <div class="dialog-body">
    </div>
  </dialog>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    close() {
      this.$emit('close');
    }
  }
});
</script>