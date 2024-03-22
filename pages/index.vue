<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
const { getImgUrl } = useAssets();

</script>
<template>
  <!-- banner -->
  <section class="py:32">
    <Carousel :autoplay="2000" :items-to-show="2" :wrap-around="true" :transition="1000" :pauseAutoplayOnHover="true">
      <Slide v-for="item in 5" :key="item">
        <div class="carousel__item">
          <img :src="getImgUrl(`banner${item}.jpg`)" alt="img">
        </div>
      </Slide>
    </Carousel>
  </section>
  <section class="p:32">
    <!-- 文章 -->
    <div class="max-w:screen-lg mx:auto mb:64">
      <p class="fg:primary f:32 f:bold t:center mb:32">精選文章</p>
      <div class="grid-cols:2 gap:32">
        <div v-for="i in 6" :key="i" class="bg:secondary r:4">
          <img :src="getImgUrl(`article${i}.jpg`)" alt="article" class="r:4">
          <div class="p:32|16">
            <p class="f:20 mb:16">{{ `標題${i}` }}</p>
            <p class="text-ellipsis fg:gray mb:16">
              布辛寺別房珠汗人草拉乙追次到幾，幾土重羊半南雪象助穴朱內，里老園教白果什習今害尺泉起陽習借會申哥。
              隻唱步戶問裝同怕東卜苗金寸經福因抱。間笑祖千怪用乞豆：童地現耍消見快坐：方的飯青車大師頁唱。
              布辛寺別房珠汗人草拉乙追次到幾，幾土重羊半南雪象助穴朱內，里老園教白果什習今害尺泉起陽習借會申哥。
              隻唱步戶問裝同怕東卜苗金寸經福因抱。間笑祖千怪用乞豆：童地現耍消見快坐：方的飯青車大師頁唱。
            </p>
            <div class="flex jc:end">
              <a
                class="inline-block p:4|16 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">查看更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 排行 -->
    <div class="max-w:screen-lg mx:auto ">
      <p class="fg:primary f:32 f:bold t:center mb:32">熱門排行</p>
      <div class="mx:auto max-w:screen-2xs overflow-x:auto">
        <table class="w:full white-space:nowrap t:center {p:8|16;}>tr>td">
          <tr class="f:bold f:18 {bb:1|solid|gray;}>td">
            <td></td>
            <td>名稱</td>
            <td>熱度</td>
          </tr>
          <tr v-for="i in 3" :key="i">
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

@keyframes color-change {
  0% {
    color: red;
  }

  50% {
    color: blue;
  }

  100% {
    color: red;
  }
}
</style>