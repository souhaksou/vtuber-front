<script setup>
const runtimeConfig = useRuntimeConfig();

import pagination from '@/components/nav/pagination.vue';
import { safeJsonParse } from '@/utils/safeJsonParse';
import copy from '@/utils/copy';
import check from '@/utils/check';

const { deepCopy } = copy();
const { popular } = check();
const { trendingTop100 } = useGithubApi();
const pageError = ref('');

const hot = ref([]);
const search = ref('');
const data = computed(() => {
  current.value = 1;
  return hot.value.filter(element => element.name.includes(search.value));
});
const show = 10;
const max = computed(() => {
  return Math.ceil(data.value.length / show);
});
const current = ref(1);
const currentChange = (value) => {
  current.value = value;
};
const paginationShow = (num) => {
  if (num < current.value * show && num >= (current.value - 1) * show) {
    return true;
  }
  else {
    return false;
  }
};

// L2: timeout；L6: pending 做 loading 狀態
const { data: hotRaw, status: hotStatus, pending: loading } = useFetch(trendingTop100, { method: 'GET', timeout: 10000 });

watch(hotStatus, (status) => {
  if (status === 'success') {
    const parsed = safeJsonParse(hotRaw.value, {});
    hot.value = deepCopy(Array.isArray(parsed?.VTubers) ? parsed.VTubers : []);
  } else if (status === 'error') {
    pageError.value = '熱門排行資料讀取失敗，請稍後再試。';
  }
}, { immediate: true });

const h1 = ref('');
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;

// L3: SEO fallback，成功後由 setSeo 覆蓋
useHead({ title: '熱門排行 | VTuber 台灣' });

const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'hot'
  }),
  timeout: 10000
});

const setSeo = (obj) => {
  h1.value = obj.h1;
  useHead({
    title: obj.title,
    meta: [
      { name: 'description', content: obj.description },
      { property: 'og:title', content: obj.title },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:description', content: obj.description },
      { property: 'og:image', content: obj.imgUrl },
      { property: 'og:type', content: obj.type },
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
      <template v-if="pageError">
        <p class="t:center f:20 fg:red">{{ pageError }}</p>
      </template>
      <template v-else-if="loading">
        <p class="t:center f:20">載入中...</p>
      </template>
      <template v-else-if="hot.length > 0">
        <div class="flex jc:end mb:32">
          <input v-model="search" type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray"
            placeholder="篩選名稱">
        </div>
        <div class="overflow-x:auto mb:16">
          <table class="w:full t:center {p:8;}>tr>td {p:16|8;}>tr>td@xs">
            <tr class="f:bold f:16 f:18@xs {by:1|solid|gray;bg:gray-10;}>td">
              <td class="min-w:240 w:300@xs">名稱</td>
              <td>Youtube</td>
              <td>Twitch</td>
              <td>連結</td>
            </tr>
            <template v-for="(item, index) in data" :key="`livestream${index}`">
              <tr class="f:14 f:16@xs" v-if="paginationShow(index)"
                :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                <td>
                  <div class="flex jc:start ai:center">
                    <img :src="item.imgUrl" alt="article" class="mx:16 w:40 r:50%">
                    <p> {{ item.name }}</p>
                  </div>
                </td>
                <td>{{ item.YouTube !== undefined ? item.YouTube.popularity : '' }}</td>
                <td>{{ item.Twitch !== undefined ? item.Twitch.popularity : '' }}</td>
                <td>
                  <a :href="popular(item.popularVideo)" target="_blank" rel="noopener noreferrer" class="f:20 fg:primary inline-block px:8"><i
                      class="bi bi-play-btn-fill"></i></a>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <div>
          <pagination :length="data.length" :max="max" :show="show" :current="current" @current="currentChange" />
        </div>
      </template>
      <template v-else>
        <p class="t:center f:20">無資料</p>
      </template>
    </div>
  </section>
</template>
