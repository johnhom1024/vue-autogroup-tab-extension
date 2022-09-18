<template>
  <div class="popup-container">{{ text }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('hello world 111')
</script>


<style lang="scss" scoped>
.popup-container {
  width: 500px;
}
  
</style>