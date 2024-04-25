<script setup>
const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const url = `${runtimeConfig.public.API_BASE_URL}/api/chart`;
const res = await useFetch(url, { method: 'GET' });

if (res.status.value === 'success') {
  data.value = res.data.value.data;
}

const h1 = ref('');
const seo = ref(null);
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;
const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'charts'
  })
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
  seo.value = seoRes.data.value.data;
  setSeo(seo.value);
}

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ h1 }}</h1>
      <div class="grid-cols:1 gap:32 gap:64@xs">
        <div v-for="(item, index) in data" :key="`chart${index}`">
          <iframe :src="item.chartUrl" allowfullscreen :class="`aspect:${item.width}/${item.height}`"
            class="w:full max-w:600 mx:auto"></iframe>
        </div>
      </div>
    </div>
  </section>
</template>