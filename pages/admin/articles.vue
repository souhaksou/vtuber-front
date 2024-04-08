<script setup>
definePageMeta({
    layout: 'admin'
})
</script>
<template>
    <div class="p:16|32|0">
        <div class="max-w:screen-lg mx:auto flex jc:end ai:center 
    {fg:link;f:14;;inline-block;p:4|8;}>a {fg:white;bg:link;}>a.router-link-exact-active">
            <NuxtLink to="/admin/articles">文章</NuxtLink>
            <NuxtLink to="/admin/articles/categories">分類</NuxtLink>
            <NuxtLink to="/admin/articles/tags">標籤</NuxtLink>
        </div>
    </div>
    <NuxtPage />
</template>