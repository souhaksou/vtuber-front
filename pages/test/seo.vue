<script setup>
definePageMeta({
  layout: 'nothing'
});

useHead({
  title: 'SEO 頁面',
  link: [
    { rel: 'canonical', href: 'https://r-lover.com/tutorial/r-basic/install-r-and-rstudio/' }
  ],
  meta: [
    { name: 'description', content: '這裡是 Nuxt 3 學習筆記 實戰部落格' },
    { property: 'og:title', content: 'SEO 頁面' },
    { property: 'og:locale', content: 'zh_TW' },
    { property: 'og:description', content: '這裡是 Nuxt 3 學習筆記 實戰部落格' },
    { property: 'og:image', content: 'https://r-lover.com/wp-content/uploads/2022/11/image-26.png' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: 'https://r-lover.com/tutorial/r-basic/install-r-and-rstudio/' },
    { property: 'og:site_name', content: '愛上R語言' },
    { name: 'author', content: 'Dennis Tseng' }
  ],
});

</script>

<template>
  <div>seo</div>
</template>