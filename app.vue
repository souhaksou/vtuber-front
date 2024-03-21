<script setup>
import { defineAsyncComponent } from 'vue';
const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider);
</script>
<template>
  <NuxtLayout>
    <CSSRuntimeProvider :config="import('./master.css')">
      <NuxtPage />
    </CSSRuntimeProvider>
  </NuxtLayout>
</template>