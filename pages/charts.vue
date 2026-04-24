<script setup>
const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const pageError = ref('');
const url = `${runtimeConfig.public.API_BASE_URL}/api/chart`;
const { data: resData, status: resStatus, pending: loading } = useFetch(url, { method: 'GET', timeout: 10000 });
watch(resStatus, (status) => {
  if (status === 'success') {
    data.value = resData.value.data;
  } else if (status === 'error') {
    pageError.value = '圖表資料讀取失敗，請稍後再試。';
  }
}, { immediate: true });

const h1 = ref('');
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;

useHead({ title: '圖表 | VTuber 台灣' });

const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'charts'
  }),
  timeout: 10000
});

const setSeo = (obj) => {
  h1.value = obj.h1;
  useHead({
    title: obj.title,
    // link: [
    //   { rel: 'canonical', href: window.location.href }
    // ],
    meta: [
      { name: 'description', content: obj.description },
      { property: 'og:title', content: obj.title },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:description', content: obj.description },
      { property: 'og:image', content: obj.imgUrl },
      { property: 'og:type', content: obj.type },
      // { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'vtuber' },
      { name: 'author', content: obj.author }
    ],
  });
};

if (seoRes.status.value === 'success') {
  setSeo(seoRes.data.value.data);
}

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ h1 }}</h1>
      <p v-if="pageError" class="t:center f:20 fg:red">{{ pageError }}</p>
      <p v-else-if="loading" class="t:center f:20">載入中...</p>
      <div v-else class="grid-cols:1 gap:32 gap:64@xs">
        <div v-for="(item, index) in data" :key="`chart${index}`">
          <iframe :src="item.chartUrl" allowfullscreen :class="`aspect:${item.width}/${item.height}`"
            class="w:full max-w:600 mx:auto"></iframe>
        </div>
      </div>
    </div>
  </section>
</template>