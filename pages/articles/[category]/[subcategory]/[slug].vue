<script setup>
const route = useRoute();
const { category, subcategory, slug } = route.params;
const { toLocal } = useTime();
const runtimeConfig = useRuntimeConfig();

const data = ref(null);
const container = ref(null);

const url = `${runtimeConfig.public.API_BASE_URL}/api/article`;
const res = await useFetch(url, {
  method: 'post',
  body: {
    slug: slug
  }
});
if (res.status.value === 'success') {
  data.value = res.data.value.data;
}

const changeCss = (textContainer) => {
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

onMounted(() => {
  changeCss(container.value);
});

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-xs mx:auto">
      <template v-if="data">
        <h1 class="fg:primary f:36 f:bold t:center mb:32">{{ data.title }}</h1>
        <div class="bg:secondary lh:2.0 p:16 p:32|48@xs">
          <p class="mb:16"> {{
        `${toLocal(data.createdAt)}&nbsp;&nbsp;${data.subcategoryId.categoryId.show}&nbsp;/&nbsp;${data.subcategoryId.show}`
      }}</p>
          <div class="mb:32">
            <img :src="data.imgUrl" alt="img">
          </div>
          <div class="r:4 bg:#F5F5F5 mb:32 p:8|16 p:16|32@xs">
            <blockquote>
              {{ `❝&nbsp;&nbsp;${data.blockquote}&nbsp;&nbsp;❞` }}
            </blockquote>
          </div>
          <p class="mb:16">{{ data.description }}</p>
          <div ref="container" v-html="data.text"></div>
        </div>
      </template>
      <template v-else>
        <p class="f:32 t:center my:64">找不到文章</p>
      </template>
    </div>
  </section>
</template>