<script setup>
const list = ref(false);

const route = useRoute();

watch(() => route.fullPath, () => {
  list.value = false;
});
</script>

<template>
  <nav class="bg:#EE9FCB p:12|32 hide block@xs">
    <div class="flex jc:space-between ai:center max-w:screen-lg mx:auto">
      <NuxtLink to="/" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
        <i class="bi bi-house-door-fill mr:8"></i>首頁
      </NuxtLink>
      <div class="flex jc:space-between ai:center {fg:#F8F8FF;f:18;text-shadow:1|2|3|#653951;inline-block;p:8|16;bb:2|solid|#EE9FCB;transition:400ms;}>a 
    {border-color:#F8F8FF;r:4;}>a:hover {bg:#E15EA7;}>a.router-link-active">
        <NuxtLink to="/articles/featured"><i class="bi bi-bookmark-star-fill mr:8"></i>精選</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/articles"><i class="bi bi-book-half mr:8"></i>文章</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/rankings"><i class="bi bi-award-fill mr:8"></i>排行</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/livestreams"><i class="bi bi-play-btn-fill mr:8"></i>直播</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/charts"><i class="bi bi-bar-chart-fill mr:8"></i>圖表</NuxtLink>
      </div>
    </div>
  </nav>
  <nav class="rel hide@xs">
    <label class="cursor:pointer fixed top:0 right:0 z:10 inline-block p:4|8 fg:white bg:#653951" for="list">
      <i class="bi" :class="list === false ? 'bi-list' : 'bi-x-lg'"></i>
    </label>
    <input type="checkbox" v-model="list" id="list" class="hide">
    <div :class="list === false ? 'left:-100%' : 'left:0'" class="transition:400ms fixed top:0 z:5 w:full bg:#653951 {fg:#F8F8FF;bg:#EE9FCB;block;p:8|16;t:center;}>a 
      {bg:#F8F8FF;fg:primary;}>a.router-link-active">
      <div class="h:32"></div>
      <NuxtLink to="/">首頁</NuxtLink>
      <NuxtLink to="/articles/featured">精選</NuxtLink>
      <NuxtLink to="/articles">文章</NuxtLink>
      <NuxtLink to="/rankings">排行</NuxtLink>
      <NuxtLink to="/livestreams">直播</NuxtLink>
      <NuxtLink to="/charts">圖表</NuxtLink>
    </div>
  </nav>
</template>