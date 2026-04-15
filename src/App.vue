<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Global sıfırlama ayarları kalsın */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #1e1e1e; /* Arka plan hep koyu kalsın */
  font-family: sans-serif;
  overflow: hidden; 
}
</style>