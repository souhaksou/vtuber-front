<script setup>
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  router.push('/login');
};

</script>

<template>
  <nav class="bg:#EE9FCB p:12|32">
    <div class="flex jc:space-between ai:center max-w:screen-lg mx:auto">
      <div
        class="flex jc:space-between ai:center {fg:#F8F8FF;f:18;text-shadow:1|2|3|#653951;inline-block;p:8|16;bb:2|solid|#EE9FCB;transition:400ms;r:4;}>a">
        <NuxtLink to="/admin/home"> <i class="bi bi-house-door-fill mr:8"></i>首頁</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/admin/featured"><i class="bi bi-bookmark-star-fill mr:8"></i>精選</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/admin/articles"><i class="bi bi-book-half mr:8"></i>文章</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/admin/charts"><i class="bi bi-bar-chart-fill mr:8"></i>圖表</NuxtLink>
        <div class="w:8"></div>
        <NuxtLink to="/admin/seo"><i class="bi bi-chat-square-heart mr:8"></i>SEO</NuxtLink>
      </div>
      <div class="flex ai:center">
        <NuxtLink to="/admin" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
          <i class="bi bi-person-circle mr:8"></i>帳號
        </NuxtLink>
        <div class="w:8"></div>
        <a @click="logout" class="fg:#F8F8FF f:18 text-shadow:1|2|3|#653951 inline-block p:8|16">
          <i class="bi bi-box-arrow-right mr:8"></i>登出
        </a>
      </div>
    </div>
  </nav>
</template>