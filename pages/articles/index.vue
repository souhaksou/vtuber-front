<script setup>
const runtimeConfig = useRuntimeConfig();
const { toLocal } = useTime();
// const searchOption = ref('');

const article = ref([]);

const url = `${runtimeConfig.public.API_BASE_URL}/api/article`;
const res = await useFetch(url, { method: 'GET' });

if (res.status.value === 'success') {
  article.value = res.data.value.data;
}

const search = ref('');
const data = computed(() => {
  return article.value.filter(element => element.articleId.title.includes(search.value));
});

const gotoArticle = (item) => {
  let result = '/articles/' + item.articleId.subcategoryId.categoryId.name + '/' + item.articleId.subcategoryId.name + '/' + item.articleId.slug;
  return result;
};

const h1 = ref('');
const seo = ref(null);
const seoUrl = `${runtimeConfig.public.API_BASE_URL}/api/seo`;
const seoRes = await useFetch(seoUrl, {
  method: 'POST',
  body: JSON.stringify({
    page: 'articles'
  })
});

const setSeo = (obj) => {
  h1.value = obj.h1;
  useHead({
    title: obj.title,
    // link: [
    //   { rel: 'canonical', href: window.location.href }
    // ],
    meta: [
      { name: 'description', content: obj.description },
      { property: 'og:title', content: obj.title },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:description', content: obj.description },
      { property: 'og:image', content: obj.imgUrl },
      { property: 'og:type', content: obj.type },
      // { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'vtuber' },
      { name: 'author', content: obj.author }
    ],
  });
};

if (seoRes.status.value === 'success') {
  seo.value = seoRes.data.value.data;
  setSeo(seo.value);
}

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ h1 }}</h1>
      <!-- 搜尋 -->
      <!-- <div class="flex jc:space-between ai:center mb:32">
        <div class="flex ai:center">
          <div class="flex ai:center">
            <p class="f:bold">選項</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray" v-model="searchOption">
              <option value="">無</option>
              <option value="category">分類</option>
              <option value="tag">標籤</option>
            </select>
          </div>
          <div v-show="searchOption === 'category'" class="flex ai:center">
            <div class="w:32"></div>
            <p class="f:bold">大分類</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `分類${i}` }}</option>
            </select>
            <div class="w:32"></div>
            <p class="f:bold">小分類</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `分類${i}` }}</option>
            </select>
          </div>
          <div v-show="searchOption === 'tag'" class="flex ai:center">
            <div class="w:32"></div>
            <p class="f:bold">標籤</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `標籤${i}` }}</option>
            </select>
          </div>
        </div>
        <div class="flex ai:center">
          <a
            class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
            搜尋</a>
          <div class="w:32"></div>
          <input type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray" placeholder="篩選名稱">
        </div>
      </div> -->
      <!-- 文章 -->
      <div class="flex jc:end ai:center mb:32">
        <!-- <a
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
          搜尋</a>
        <div class="w:32"></div> -->
        <input type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray" placeholder="篩選名稱"
          v-model="search">
      </div>
      <div class="bg:secondary p:32 grid-cols:1 gap:32">
        <div v-for="(item, index) in data" :key="`article${index}`">
          <h2 class="f:24 mb:16">
            <NuxtLink :to="gotoArticle(item)" class="fg:link">{{ item.articleId.title }}</NuxtLink>
          </h2>
          <p class="f:14 mb:16 fg:gray">
            {{
        `${toLocal(item.articleId.createdAt)}&nbsp;&nbsp;${item.articleId.subcategoryId.categoryId.show}&nbsp;&nbsp;${item.articleId.subcategoryId.show}`
      }}
          </p>
          <div class="flex@xs flex:row-reverse jc:space-between ai:start">
            <div class="aspect:3/2 w:full rel overflow:hidden mb:16 {mb:0;max-w:200;}@xs ">
              <img class="w:full abs top:50% left:50% translate(-50%,-50%)" :src="item.articleId.imgUrl" alt="img">
            </div>
            <div class="w:32"></div>
            <div class="w:full max-w:screen-xs">
              <p>{{ item.articleId.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination -->
  </section>
</template>