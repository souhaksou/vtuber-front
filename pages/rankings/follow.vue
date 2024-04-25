<script setup>
const runtimeConfig = useRuntimeConfig();

import pagination from '@/components/nav/pagination.vue';

const { deepCopy } = useCopy();
const { popular, checkFollow } = useCheck();

const followUrl = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW/vtubers/all.json';
const follow = ref([]);
const search = ref('');
const data = computed(() => {
  current.value = 1;
  return follow.value.filter(element => element.name.includes(search.value));
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

const followResult = await useFetch(followUrl, { method: 'GET' });
if (followResult.status.value === 'success') {
  follow.value = deepCopy(JSON.parse(followResult.data.value).VTubers);
}

const h1 = ref('');
const seo = ref(null);
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;
const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'follow'
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
      <template v-if="follow.length > 0">
        <div class="flex jc:end mb:32">
          <input v-model="search" type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray"
            placeholder="篩選名稱">
        </div>
        <div class="overflow-x:auto mb:16">
          <table class="w:full t:center {p:8;}>tr>td {p:16|8;}>tr>td@xs">
            <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
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
                <td>{{ checkFollow(item, 'YouTube') }}</td>
                <td>{{ checkFollow(item, 'Twitch') }}</td>
                <td>
                  <template v-if="item.popularVideo">
                    <a :href="popular(item.popularVideo)" target="_blank" class="f:20 fg:primary inline-block px:8"><i
                        class="bi bi-play-btn-fill"></i></a>
                  </template>
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