<script setup>
import { defineAsyncComponent } from 'vue';
const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider);
import { container } from 'jenesius-vue-modal';
const WidgetContainerModal = container;
</script>
<template>
  <NuxtLayout>
    <CSSRuntimeProvider :config="import('./master.css')">
      <NuxtPage />
      <widget-container-modal />
    </CSSRuntimeProvider>
  </NuxtLayout>
</template>