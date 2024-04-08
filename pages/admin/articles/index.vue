<script setup>

import { openModal, promptModal } from 'jenesius-vue-modal';
import articleModal from '@/components/modal/articleModal.vue';
import confirmMsg from '@/components/modal/confirmMsg.vue';
import okMsg from '@/components/modal/okMsg.vue';
import errorMsg from '@/components/modal/errorMsg.vue';

const router = useRouter();
const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem('token');

const tags = ref([]);
// const tagShow = ref(null);
const categories = ref([]);
const getTag = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/tag`,
      headers: { token },
    });
    if (res.data.success === true) {
      tags.value = res.data.data;
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
const getCategory = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/joincategory`,
      headers: { token },
    });
    if (res.data.success === true) {
      categories.value = res.data.data;
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

onMounted(async () => {
  await getCategory();
  await getTag();
});

const data = ref([]);

const getData = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/article`,
      headers: { token },
    });
    if (res.data.success === true) {
      data.value = res.data.data;
      console.log(data.value);
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

const addArticle = async () => {
  const result = await promptModal(articleModal, { type: 'add', categories: categories.value, tags: tags.value });
  // if (result && result.isConfirmed === true) {
  //   try {
  //     const res = await $axios({
  //       method: 'post',
  //       url: `${runtimeConfig.public.API_BASE_URL}/admin/category`,
  //       headers: { token },
  //       data: result.data
  //     });
  //     if (res.data.success === true) {
  //       const message = res.data.message;
  //       await openModal(okMsg, { msg: message });
  //       setTimeout(() => {
  //         window.location.reload(true);
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response.data.success === false) {
  //       const message = error.response.data.message;
  //       if (message === 'TokenExpiredError') {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('expirationDate');
  //         router.push('/login');
  //       }
  //     }
  //   }
  // }
};

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <!-- <div class="flex jc:space-between ai:center mb:32">
        <div class="flex ai:center">
          <p class="f:bold">標籤</p>
          <div class="w:16"></div>
          <select class="inline-block p:4|18 r:4 b:1|solid|gray">
            <option v-for="item in tags" :key="item.name">{{ item.name }}</option>
          </select>
          <div class="w:32"></div>
          <p class="f:bold">大分類</p>
          <div class="w:16"></div>
          <select class="inline-block p:4|18 r:4 b:1|solid|gray" v-model="tagShow">
            <option v-for="item in categories" :value="item.subcategories" :key="item.name">{{ item.name }}</option>
          </select>
          <div class="w:32"></div>
          <p class="f:bold">子分類</p>
          <div class="w:16"></div>
          <select class="inline-block p:4|18 r:4 b:1|solid|gray">
            <option v-for="item in tagShow" :key="item.name">{{ item.name }}</option>
          </select>
        </div>
        <div class="flex ai:center">
          <a @click="addArticle"
            class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">新增</a>
          <div class="w:16"></div>
          <a @click="getData"
            class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
          <div class="w:16"></div>
          <input type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray" placeholder="篩選名稱">
        </div>
      </div> -->
      <div class="flex jc:end mb:32">
        <a @click="addArticle"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">新增</a>
        <div class="w:16"></div>
        <a @click="getData"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
      </div>
      <div class="overflow-x:auto">
        <table class="w:full t:center {p:16|8;}>tr>td">
          <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
            <td>item</td>
          </tr>
          <template v-for="(item, index) in data" :key="`category${index}`">
            <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
              <td>
                <p>{{ item }}</p>
              </td>
              <!-- <td>
                <div class="flex jc:center ai:center">
                  <a @click="editCategory(index)"
                    class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
                    <i class="bi bi-pencil-square"></i><span>&nbsp;編輯</span>
                  </a>
                  <div class="w:16"></div>
                  <a @click="deleteCategory(item)"
                    class="inline-block p:4|8 r:4 fg:white bg:third b:1|solid|third transition:400ms {fg:third;bg:transparent;}:hover">
                    <i class="bi bi-eraser-fill"></i><span>&nbsp;刪除</span>
                  </a>
                </div>
              </td> -->
            </tr>
          </template>
        </table>
      </div>
    </div>
  </section>
</template>