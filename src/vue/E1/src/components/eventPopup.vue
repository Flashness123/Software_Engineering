<template>
  <div class="modal">
    <div class="modal-content">
      <button type="button" @click="close">Close</button>
    </div>
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