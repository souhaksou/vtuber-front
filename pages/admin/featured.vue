<script setup>
definePageMeta({
  layout: 'admin'
})

import { openModal, promptModal } from 'jenesius-vue-modal';
import okMsg from '@/components/modal/okMsg.vue';
import { parseApiError } from '@/utils/parseApiError';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

const router = useRouter();
const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const { getAdminTokenOrRedirect } = useAdminToken();

const data = ref([]);
const container = ref(null);
const getHeadersOrRedirect = () => {
  const token = getAdminTokenOrRedirect();
  if (!token) return null;
  return { token };
};

const sanitizedData = computed(() =>
  data.value.map(item => ({
    ...item,
    safeText: sanitizeHtml(item.text || '')
  }))
);

const getData = async () => {
  const headers = getHeadersOrRedirect();
  if (!headers) return;
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/featured`,
      headers,
    });
    if (res.data.success === true) {
      data.value = res.data.data;
    }
  } catch (error) {
    console.error(error);
    const parsedError = parseApiError(error);
    if (parsedError.isTokenExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      router.push('/login');
    }
  }
};

const editFeatured = async (item) => {
  const { default: featuredModal } = await import('@/components/modal/featuredModal.vue');
  const result = await promptModal(featuredModal, { type: 'edit', item: item });
  if (result && result.isConfirmed === true) {
    const headers = getHeadersOrRedirect();
    if (!headers) return;
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/featured`,
        headers,
        data: result.data
      });
      if (res.data.success === true) {
        const message = res.data.message;
        await openModal(okMsg, { msg: message });
        await getData();
      }
    } catch (error) {
      console.error(error);
      const parsedError = parseApiError(error);
      if (parsedError.isTokenExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        router.push('/login');
      }
    }
  }
};

const changeCss = (textContainer) => {
  if (!textContainer) return;
  textContainer.classList.add(`lh:2.0`);
  textContainer.classList.add(`{my:16;}>h2`);
  textContainer.classList.add(`{content:'\u2022';fg:#333;mr:4;}>ul>li::before`);
  textContainer.classList.add(`{fg:#333;ml:16;pl:6;}>ol>li`);
};

watch(data, async (val) => {
  if (!val?.length) return;
  await nextTick();
  if (container.value?.length) {
    changeCss(container.value[0]);
  }
});

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
        <div v-for="(item, index) in sanitizedData" :key="`text${index}`">
          <div class="flex jc:end mb:32">
            <a @click="editFeatured(item)"
              class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">編輯</a>
          </div>
          <div ref="container" class="bg:secondary p:32" v-html="item.safeText"></div>
        </div>
      </template>
    </div>
  </section>
</template>