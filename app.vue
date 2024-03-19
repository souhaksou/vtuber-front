<script setup>
import { defineAsyncComponent } from 'vue'
const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>
<template>
  <CSSRuntimeProvider :config="import('./master.css')">
    <div class="light">
    </div>
  </CSSRuntimeProvider>
</template>