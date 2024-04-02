<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
const { getImgUrl } = useAssets();
const { toLocal, live3 } = useTime();
const { deepCopy } = useCopy();

const livestreamsUrl = 'https://cdn.statically.io/gh/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/d2cd82b68091beb84ea4ef8bb276475accb84dd8/api/v2/all/livestreams/all.json';
const livestreams = ref([]);
const livestreamsResult = await useFetch(livestreamsUrl, { method: 'GET' });
if (livestreamsResult.status.value === 'success') {
  const arr = deepCopy(livestreamsResult.data.value.livestreams);
  livestreams.value = live3(arr);
}


</script>
<template>
  <!-- banner -->
  <section class="py:32">
    <!-- <h1>title</h1> -->
    <Carousel :autoplay="2000" :items-to-show="2" :wrap-around="true" :transition="1000" :pauseAutoplayOnHover="true">
      <Slide v-for="item in 5" :key="item">
        <div class="carousel__item">
          <img :src="getImgUrl(`banner${item}.jpg`)" alt="img">
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
          <div v-for="i in 6" :key="i" class="bg:secondary r:4">
            <img :src="getImgUrl(`article${i}.jpg`)" alt="article" class="r:4">
            <div class="p:32|16">
              <h2 class="f:24 mb:16">{{ `標題${i}` }}</h2>
              <p class="text-ellipsis fg:gray">
                布辛寺別房珠汗人草拉乙追次到幾，幾土重羊半南雪象助穴朱內，里老園教白果什習今害尺泉起陽習借會申哥。
                隻唱步戶問裝同怕東卜苗金寸經福因抱。間笑祖千怪用乞豆：童地現耍消見快坐：方的飯青車大師頁唱。
                布辛寺別房珠汗人草拉乙追次到幾，幾土重羊半南雪象助穴朱內，里老園教白果什習今害尺泉起陽習借會申哥。
                隻唱步戶問裝同怕東卜苗金寸經福因抱。間笑祖千怪用乞豆：童地現耍消見快坐：方的飯青車大師頁唱。
              </p>
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
          <NuxtLink to="/rankings" class="inline-block">熱門排行</NuxtLink>
        </p>
        <div class="grid-cols:2 gap:32">
          <div class="overflow-x:auto">
            <h2 class="f:24 mb:16 t:center">排行榜1</h2>
            <table class="w:full white-space:nowrap t:center {p:8|16;}>tr>td">
              <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                <td></td>
                <td>名稱</td>
                <td>熱度</td>
              </tr>
              <tr v-for="i in 3" :key="i" :class="`${i % 2 === 1 ? 'bg:secondary' : ''}`">
                <td>{{ i }}</td>
                <td>
                  <div class="flex ai:center">
                    <div class="m:4|16">
                      <img :src="getImgUrl(`vtuber${i}.jpg`)" alt="article" class="w:48 r:50%">
                    </div>
                    <p> {{ `名稱${i}` }}</p>
                  </div>
                </td>
                <td>{{ (4 - i) * 100000 }}</td>
              </tr>
            </table>
          </div>
          <div class="overflow-x:auto">
            <h2 class="f:24 mb:16 t:center">排行榜2</h2>
            <table class="w:full white-space:nowrap t:center {p:8|16;}>tr>td">
              <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                <td></td>
                <td>名稱</td>
                <td>熱度</td>
              </tr>
              <tr v-for="i in 3" :key="i" :class="`${i % 2 === 0 ? 'bg:secondary' : ''}`">
                <td>{{ i }}</td>
                <td>
                  <div class="flex ai:center">
                    <div class="m:4|16">
                      <img :src="getImgUrl(`vtuber${i}.jpg`)" alt="article" class="w:48 r:50%">
                    </div>
                    <p> {{ `名稱${i}` }}</p>
                  </div>
                </td>
                <td>{{ (4 - i) * 100000 }}</td>
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
              <h2 class="f:24 mb:16 t:center">實況中</h2>
              <table class="w:full white-space:nowrap t:center {p:8|16;}>tr>td">
                <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                  <td>名稱</td>
                  <td>開始時間</td>
                  <td>連結</td>
                </tr>
                <tr v-for="(item, index) in livestreams" :key="item.id"
                  :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                  <td>
                    <div class="flex ai:center">
                      <div class="m:4|16">
                        <img :src="item.imgUrl" alt="article" class="w:48 r:50%">
                      </div>
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
            <div>圖表</div>
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