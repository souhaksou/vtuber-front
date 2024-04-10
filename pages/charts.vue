<script setup>
const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const url = `${runtimeConfig.public.API_BASE_URL}/api/chart`;
const res = await useFetch(url, { method: 'GET' });

if (res.status.value === 'success') {
  data.value = res.data.value.data;
}

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">圖表標題</h1>
      <div class="grid-cols:1 gap:32 gap:64@xs">
        <div v-for="(item, index) in data" :key="`chart${index}`">
          <iframe :src="item.chartUrl" allowfullscreen :class="`aspect:${item.width}/${item.height}`"
            class="w:full max-w:600 mx:auto"></iframe>
        </div>
      </div>
    </div>
  </section>
</template>