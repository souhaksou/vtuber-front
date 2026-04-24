<script setup>
import { sanitizeHtml } from '@/utils/sanitizeHtml';

const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const container = ref(null);
const pageError = ref('');
const url = `${runtimeConfig.public.API_BASE_URL}/api/featured`;
const { data: resData, status: resStatus, pending: loading } = useFetch(url, { method: 'GET', timeout: 10000 });
watch(resStatus, (status) => {
  if (status === 'success') {
    data.value = resData.value.data;
  } else if (status === 'error') {
    pageError.value = '精選文章資料讀取失敗，請稍後再試。';
  }
}, { immediate: true });

const sanitizedData = computed(() =>
  data.value.map(item => ({
    ...item,
    safeText: sanitizeHtml(item.text || '')
  }))
);

const changeCss = (textContainer) => {
  if (!textContainer) return;
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

watch(data, async (val) => {
  if (!val?.length) return;
  await nextTick();
  if (container.value?.length) {
    changeCss(container.value[0]);
  }
});

const h1 = ref('');
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;

useHead({ title: '精選文章 | VTuber 台灣' });

const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'featured'
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
    <div class="max-w:screen-xs mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ h1 }}</h1>
      <!-- 資料 -->
      <template v-if="pageError">
        <p class="t:center f:20 fg:red">{{ pageError }}</p>
      </template>
      <template v-else-if="loading">
        <p class="t:center f:20">載入中...</p>
      </template>
      <template v-else-if="data.length > 0">
        <div v-for="(item, index) in sanitizedData" :key="`text${index}`">
          <div ref="container" class="bg:secondary p:16 p:32@xs" v-html="item.safeText"></div>
        </div>
      </template>
    </div>
  </section>
</template>