<script setup>
import { defineAsyncComponent } from 'vue'
const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>
<template>
  <!-- <CSSRuntimeProvider :config="import('./master.css')">
    <div class="light">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </CSSRuntimeProvider> -->

  <NuxtLayout>
    <CSSRuntimeProvider :config="import('./master.css')">
      <div class="light">
        <NuxtPage />
      </div>
    </CSSRuntimeProvider>
  </NuxtLayout>

</template>