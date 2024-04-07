<script setup>
definePageMeta({
  layout: 'nothing'
});
</script>

<template>
  <section class="h:100vh bg:secondary p:32 flex jc:center ai:center">
    <div class="w:full max-w:screen-3xs bg:white p:32 r:4">
      <p class="f:40 f:bold fg:primary t:center mb:32">錯誤</p>
      <p class="f:32 t:center mb:32">找不到頁面</p>
      <div
        class="flex jc:center {inline-block;p:8|16;r:4;f:16;fg:white;bg:primary;b:1|solid|primary;transition:400ms;}>a {fg:primary;bg:transparent;}>a:hover">
        <NuxtLink to="/">回首頁</NuxtLink>
      </div>
    </div>
  </section>
</template>