<script setup>
definePageMeta({
  layout: 'admin'
})

import { openModal, promptModal } from 'jenesius-vue-modal';
import featuredModal from '@/components/modal/featuredModal.vue';
import confirmMsg from '@/components/modal/confirmMsg.vue';
import okMsg from '@/components/modal/okMsg.vue';
import errorMsg from '@/components/modal/errorMsg.vue';

const router = useRouter();
const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem('token');

const data = ref([]);
const container = ref(null);

const getData = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/featured`,
      headers: { token },
    });
    if (res.data.success === true) {
      data.value = res.data.data;
      nextTick(() => {
        changeCss(container.value[0]);
      });
    }
  } catch (error) {
    console.error(error);
    if (error.response.data.success === false) {
      const message = error.response.data.message;
      if (message === 'TokenExpiredError') {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        router.push('/login');
      }
    }
  }
};

const editFeatured = async (item) => {
  const result = await promptModal(featuredModal, { type: 'edit', item: item });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/featured`,
        headers: { token },
        data: result.data
      });
      if (res.data.success === true) {
        const message = res.data.message;
        await openModal(okMsg, { msg: message });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.success === false) {
        const message = error.response.data.message;
        if (message === 'TokenExpiredError') {
          localStorage.removeItem('token');
          localStorage.removeItem('expirationDate');
          router.push('/login');
        }
      }
    }
  }
};

const changeCss = (textContainer) => {
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

onMounted(async () => {
  await getData();
});

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <div class="flex jc:end mb:32">
        <a @click="getData"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
      </div>
      <template v-if="data.length > 0">
        <div v-for="(item, index) in data" :key="`text${index}`">
          <div class="flex jc:end mb:32">
            <a @click="editFeatured(item)"
              class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">編輯</a>
          </div>
          <div ref="container" class="bg:secondary p:32" v-html="item.text"></div>
        </div>
      </template>
    </div>
  </section>
</template>