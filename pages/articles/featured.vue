<script setup>
const runtimeConfig = useRuntimeConfig();

const data = ref([]);
const container = ref(null);
const url = `${runtimeConfig.public.API_BASE_URL}/api/featured`;
const res = await useFetch(url, { method: 'GET' });

const changeCss = (textContainer) => {
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

if (res.status.value === 'success') {
  data.value = res.data.value.data;
}

onMounted(() => {
  changeCss(container.value[0]);
});

</script>
<template>
  <section class="p:32">
    <div class="max-w:screen-xs mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">文章精選</h1>
      <!-- 資料 -->
      <template v-if="data.length > 0">
        <div v-for="(item, index) in data" :key="`text${index}`">
          <div ref="container" class="bg:secondary p:16 p:32@xs" v-html="item.text"></div>
        </div>
      </template>
    </div>
  </section>
</template>