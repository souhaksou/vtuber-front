<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
const { getImgUrl } = useAssets();
const { toLocal, live3 } = useTime();
const { deepCopy } = useCopy();
const { popular } = useCheck();

const livestreamsUrl = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW/livestreams/all.json';
const livestreams = ref([]);
const livestreamsResult = await useFetch(livestreamsUrl, { method: 'GET' });
if (livestreamsResult.status.value === 'success') {
  const arr = deepCopy(JSON.parse(livestreamsResult.data.value).livestreams);
  livestreams.value = live3(arr);
}

const hotUrl = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW/trending-vtubers/livestream/10.json';
const hot = ref([]);
const hotResult = await useFetch(hotUrl, { method: 'GET' });
if (hotResult.status.value === 'success') {
  const arr = deepCopy(JSON.parse(hotResult.data.value).VTubers);
  hot.value = arr;
}

const followUrl = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW/vtubers/10.json';
const follow = ref([]);
const followResult = await useFetch(followUrl, { method: 'GET' });
if (followResult.status.value === 'success') {
  const arr = deepCopy(JSON.parse(followResult.data.value).VTubers);
  follow.value = arr;
}

const runtimeConfig = useRuntimeConfig();

const banner = ref([]);
const article = ref([]);
const chart = ref([]);

const url = `${runtimeConfig.public.API_BASE_URL}/api/home`;
const res = await useFetch(url, { method: 'GET' });

if (res.status.value === 'success') {
  article.value = res.data.value.data.article;
  banner.value = res.data.value.data.banner;
  chart.value = res.data.value.data.chart;
}

const gotoArticle = (item) => {
  let result = '/articles/' + item.articleId.subcategoryId.categoryId.name + '/' + item.articleId.subcategoryId.name + '/' + item.articleId.slug;
  return result;
};

</script>
<template>
  <!-- banner -->
  <section class="py:32">
    <!-- <h1>title</h1> -->
    <Carousel :autoplay="2000" :items-to-show="2" :wrap-around="true" :transition="1000" :pauseAutoplayOnHover="true">
      <Slide v-for="(item, index) in banner" :key="`banner${index}`">
        <div class="carousel__item">
          <img :src="item.bannerUrl" alt="img">
        </div>
      </Slide>
    </Carousel>
  </section>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <!-- 文章 -->
      <div class="mb:64">
        <p class="fg:primary f:36 f:bold t:center mb:32">
          <NuxtLink to="/articles/featured" class="inline-block">精選文章</NuxtLink>
        </p>
        <div class="grid-cols:2 gap:32 mb:64">
          <div v-for="(item, index) in article" :key="`article${index}`" class="bg:secondary r:4">
            <div class="aspect:3/2 w:full rel overflow:hidden">
              <img :src="item.articleId.imgUrl" alt="article"
                class="r:4 w:full abs top:50% left:50% translate(-50%,-50%)">
            </div>
            <div class="p:32|16">
              <h2 class="f:24 mb:16">
                <NuxtLink :to="gotoArticle(item)" class="fg:link">{{ item.articleId.title }}</NuxtLink>
              </h2>
              <p class="text-ellipsis fg:gray">{{ item.articleId.description }}</p>
            </div>
          </div>
        </div>
        <p class="t:center">
          <NuxtLink to="/articles"
            class="inline-block p:8|32 r:4 f:24 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
            查看所有文章</NuxtLink>
        </p>
      </div>
      <!-- 排行 -->
      <div class="mb:64">
        <p class="fg:primary f:36 f:bold t:center mb:32">
          <NuxtLink to="/rankings" class="inline-block">排行</NuxtLink>
        </p>
        <div class="grid-cols:2 gap:32">
          <div class="overflow-x:auto">
            <h2 class="f:24 mb:16 t:center">熱門人氣</h2>
            <table class="w:full white-space:nowrap t:center {p:8;}>tr>td">
              <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                <td>名稱</td>
                <td>人氣</td>
                <td>連結</td>
              </tr>
              <tr v-for="(item, index) in hot" :key="item.id" :class="`${index % 2 === 1 ? 'bg:secondary' : ''}`">
                <td>
                  <div class="flex jc:start ai:center">
                    <img :src="item.imgUrl" alt="article" class="mx:16 w:40 r:50%">
                    <p>{{ item.name }}</p>
                  </div>
                </td>
                <td>{{ (item.YouTube !== undefined ? item.YouTube.popularity : 0) + (item.Twitch !== undefined ?
                  item.Twitch.popularity : 0) }}</td>
                <td>
                  <a :href="popular(item.popularVideo)" target="_blank" class="f:20 fg:primary inline-block px:8"><i
                      class="bi bi-play-btn-fill"></i></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="overflow-x:auto">
            <h2 class="f:24 mb:16 t:center">訂閱追蹤</h2>
            <table class="w:full white-space:nowrap t:center {p:8;}>tr>td">
              <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                <td>名稱</td>
                <td>人數</td>
                <td>連結</td>
              </tr>
              <tr v-for="(item, index) in follow" :key="item.id" :class="`${index % 2 === 0 ? 'bg:secondary' : ''}`">
                <td>
                  <div class="flex jc:start ai:center">
                    <img :src="item.imgUrl" alt="article" class="mx:16 w:40 r:50%">
                    <p>{{ item.name }}</p>
                  </div>
                </td>
                <td>{{ (item.YouTube !== undefined ? item.YouTube.subscriber.count : 0) + (item.Twitch !== undefined ?
                  item.Twitch.follower.count : 0) }}</td>
                <td>
                  <a :href="popular(item.popularVideo)" target="_blank" class="f:20 fg:primary inline-block px:8"><i
                      class="bi bi-play-btn-fill"></i></a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- 直播跟圖表 -->
      <div class="mx:auto">
        <div class="grid-cols:2 gap:32">
          <div class="overflow-x:auto">
            <p class="fg:primary f:36 f:bold t:center mb:32">
              <NuxtLink to="/livestreams" class="inline-block">直播</NuxtLink>
            </p>
            <div class="overflow-x:auto">
              <h2 class="f:24 mb:16 t:center">實況當中</h2>
              <table class="w:full white-space:nowrap t:center {p:8;}>tr>td">
                <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                  <td>名稱</td>
                  <td class="w:200">開始時間</td>
                  <td>連結</td>
                </tr>
                <tr v-for="(item, index) in livestreams" :key="item.id"
                  :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                  <td>
                    <div class="flex jc:start ai:center">
                      <img :src="item.imgUrl" alt="article" class="mx:16 w:40 r:50%">
                      <p> {{ item.name }}</p>
                    </div>
                  </td>
                  <td>{{ toLocal(item.startTime) }}</td>
                  <td>
                    <a :href="item.videoUrl" target="_blank" class="f:20 fg:primary inline-block px:8"><i
                        class="bi bi-play-btn-fill"></i></a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <p class="fg:primary f:36 f:bold t:center mb:32">
              <NuxtLink to="/charts" class="inline-block">圖表</NuxtLink>
            </p>
            <template v-for="(item, index) in chart" :key="`chart${index}`">
              <h2 class="f:24 mb:16 t:center">{{ item.name }}</h2>
              <div>
                <iframe :src="item.chartUrl" allowfullscreen :class="`aspect:${item.width}/${item.height}`"
                  class="w:full max-w:600 mx:auto"></iframe>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>