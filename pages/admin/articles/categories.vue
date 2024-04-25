<script setup>

import { openModal, promptModal } from 'jenesius-vue-modal';
import categoryModal from '@/components/modal/categoryModal.vue';
import subcategoryModal from '@/components/modal/subcategoryModal.vue';
import confirmMsg from '@/components/modal/confirmMsg.vue';
import okMsg from '@/components/modal/okMsg.vue';
import errorMsg from '@/components/modal/errorMsg.vue';

const router = useRouter();
const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem('token');
const { deepCopy } = useCopy();

const data = ref([]);

const getData = async () => {
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/joincategory`,
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

const addCategory = async () => {
  const result = await promptModal(categoryModal, { type: 'add', item: data.value });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'post',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/category`,
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

const editCategory = async (index) => {
  const result = await promptModal(categoryModal, { type: 'edit', index: index, item: data.value });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/category`,
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

const deleteCategory = async (item) => {
  const result = await promptModal(confirmMsg, { msg: '確認刪除' });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'delete',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/category`,
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

const addSubcategory = async (item) => {
  const result = await promptModal(subcategoryModal, { type: 'add', item: item });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'post',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/subcategory`,
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

const editSubcategory = async (item, ii) => {
  const result = await promptModal(subcategoryModal, { type: 'edit', index: ii, item: item });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/subcategory`,
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

const deleteSubcategory = async (item) => {
  const result = await promptModal(confirmMsg, { msg: '確認刪除' });
  if (result && result.isConfirmed === true) {
    try {
      const res = await $axios({
        method: 'delete',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/subcategory`,
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
        <a @click="addCategory"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">新增</a>
        <div class="w:16"></div>
        <a @click="getData"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
      </div>
      <div class="overflow-x:auto">
        <table class="w:full t:center {p:16|8;}>tr>td">
          <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
            <td>大分類</td>
            <td></td>
            <td>子分類</td>
          </tr>
          <template v-for="(item, index) in data" :key="`category${index}`">
            <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
              <td>
                <p>{{ `名稱&nbsp;${item.name}&nbsp;&nbsp;中文&nbsp;${item.show}` }}</p>
              </td>
              <td>
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
              </td>
              <td>
                <div class="grid-cols:1 gap:16">
                  <div class="flex jc:end">
                    <a @click="addSubcategory(item)"
                      class="inline-block p:4|8 r:4 fg:white bg:link b:1|solid|link transition:400ms {fg:link;bg:transparent;}:hover">
                      <i class="bi bi-plus-square-fill"></i><span>&nbsp;新增</span>
                    </a>
                  </div>
                  <div v-for="(i, ii) in item.subcategories" :key="i._id" class="flex jc:space-between ai:center">
                    <p>{{ `名稱&nbsp;${i.name}&nbsp;&nbsp;中文&nbsp;${i.show}` }}</p>
                    <div class="flex jc:center ai:center">
                      <a @click="editSubcategory(item, ii)"
                        class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
                        <i class="bi bi-pencil-square"></i><span>&nbsp;編輯</span>
                      </a>
                      <div class="w:16"></div>
                      <a @click="deleteSubcategory(i)"
                        class="inline-block p:4|8 r:4 fg:white bg:third b:1|solid|third transition:400ms {fg:third;bg:transparent;}:hover">
                        <i class="bi bi-eraser-fill"></i><span>&nbsp;刪除</span>
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </section>
</template>