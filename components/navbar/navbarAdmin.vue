<template>
  <nav class="bg:#EE9FCB flex jc:space-between ai:center p:12|32">
    <div class="flex jc:space-between ai:center {fg:#F8F8FF;f:18;text-shadow:1|2|3|#653951;inline-block;p:8|16;bb:2|solid|#EE9FCB;transition:400ms;}>a 
    {border-color:#F8F8FF;}>a:hover {bg:#E15EA7;}>a.router-link-exact-active">
      <NuxtLink to="/articles"><i class="bi bi-book-half mr:8"></i>文章</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/rankings"><i class="bi bi-award-fill mr:8"></i>排行</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/livestreams"><i class="bi bi-play-btn-fill mr:8"></i>直播</NuxtLink>
      <div class="w:8"></div>
      <NuxtLink to="/charts"><i class="bi bi-bar-chart-fill mr:8"></i>圖表</NuxtLink>
    </div>
    <NuxtLink to="/" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
      <i class="bi bi-box-arrow-right mr:8"></i>登出
    </NuxtLink>
  </nav>
</template>