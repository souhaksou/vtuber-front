<script setup>
definePageMeta({
    layout: 'admin'
});
</script>
<template>
    <div class="p:16|32|0">
        <div class="max-w:screen-lg mx:auto flex jc:end ai:center 
    {fg:link;f:14;;inline-block;p:4|8;}>a {fg:white;bg:link;}>a.router-link-exact-active">
            <NuxtLink to="/admin/home">圖片</NuxtLink>
            <NuxtLink to="/admin/home/articles">文章</NuxtLink>
            <NuxtLink to="/admin/home/charts">圖表</NuxtLink>
        </div>
    </div>
    <NuxtPage />
</template>