<script setup>

import { openModal, promptModal } from 'jenesius-vue-modal';
import activeArticleModal from '@/components/modal/activeArticleModal';
import confirmMsg from '@/components/modal/confirmMsg.vue';
import okMsg from '@/components/modal/okMsg.vue';
import errorMsg from '@/components/modal/errorMsg.vue';

const router = useRouter();
const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem('token');

const data = ref([]);

const getData = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/activeArticle`,
      headers: { token },
    });
    if (res.data.success === true) {
      data.value = res.data.data;
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

const addActiveArticle = async () => {
  const result = await promptModal(activeArticleModal, { type: 'add', item: {} });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'post',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/activeArticle`,
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

const editActiveArticle = async (item) => {
  const result = await promptModal(activeArticleModal, { type: 'edit', item: item });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/activeArticle`,
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

const deleteActiveArticle = async (item) => {
  const result = await promptModal(confirmMsg, { msg: '確認刪除' });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'delete',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/activeArticle`,
        headers: { token },
        data: { _id: item._id }
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

onMounted(async () => {
  await getData();
});

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <div class="flex jc:end mb:32">
        <a @click="addActiveArticle"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">新增</a>
        <div class="w:16"></div>
        <a @click="getData"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
      </div>
      <div class="overflow-x:auto">
        <table class="w:full t:center {p:16|8;}>tr>td">
          <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
            <td>編號</td>
            <td>標題</td>
            <td></td>
            <td></td>
          </tr>
          <template v-for="(item, index) in data" :key="`banner${index}`">
            <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
              <td>{{ index + 1 }}</td>
              <td>
                {{ item.articleId.title }}
              </td>
              <td>
                <a @click="editActiveArticle(item)"
                  class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
                  <i class="bi bi-pencil-square"></i><span>&nbsp;編輯</span>
                </a>
              </td>
              <td>
                <a @click="deleteActiveArticle(item)"
                  class="inline-block p:4|8 r:4 fg:white bg:third b:1|solid|third transition:400ms {fg:third;bg:transparent;}:hover">
                  <i class="bi bi-eraser-fill"></i><span>&nbsp;刪除</span>
                </a>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </section>
</template>