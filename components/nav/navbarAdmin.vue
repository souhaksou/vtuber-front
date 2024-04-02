<template>
  <nav class="bg:#EE9FCB flex jc:space-between ai:center p:12|32">
    <div
      class="flex jc:space-between ai:center {fg:#F8F8FF;f:18;text-shadow:1|2|3|#653951;inline-block;p:8|16;bb:2|solid|#EE9FCB;transition:400ms;r:4;}>a">
      <NuxtLink to="/admin/home"> <i class="bi bi-house-door-fill mr:8"></i>首頁</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/admin/featured"><i class="bi bi-bookmark-star-fill mr:8"></i>精選</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/admin/articles"><i class="bi bi-book-half mr:8"></i>文章</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/admin/rankings"><i class="bi bi-award-fill mr:8"></i>排行</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/admin/livestreams"><i class="bi bi-play-btn-fill mr:8"></i>直播</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/admin/charts"><i class="bi bi-bar-chart-fill mr:8"></i>圖表</NuxtLink>
    </div>
    <div class="flex ai:center">
      <NuxtLink to="/admin" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
        <i class="bi bi-person-circle mr:8"></i>管理
      </NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/login" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
        <i class="bi bi-box-arrow-right mr:8"></i>登出
      </NuxtLink>
    </div>
  </nav>
</template>