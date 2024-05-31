<script setup>
const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const container = ref(null);
const url = `${runtimeConfig.public.API_BASE_URL}/api/featured`;
const res = await useFetch(url, { method: 'GET' });

if (res.status.value === 'success') {
  data.value = res.data.value.data;
}

const changeCss = (textContainer) => {
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

onMounted(() => {
  changeCss(container.value[0]);
});

const h1 = ref('');
const seo = ref(null);
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;
const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'featured'
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
    <div class="max-w:screen-xs mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ h1 }}</h1>
      <!-- 資料 -->
      <template v-if="data.length > 0">
        <div v-for="(item, index) in data" :key="`text${index}`">
          <div ref="container" class="bg:secondary p:16 p:32@xs" v-html="item.text"></div>
        </div>
      </template>
    </div>
  </section>
</template>