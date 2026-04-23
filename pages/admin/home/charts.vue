<script setup>

import { openModal, promptModal } from 'jenesius-vue-modal';
import confirmMsg from '@/components/modal/confirmMsg.vue';
import okMsg from '@/components/modal/okMsg.vue';

const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const { getAdminTokenOrRedirect } = useAdminToken();
const { handleAdminError } = useAdminError();

const data = ref([]);

const getHeadersOrRedirect = () => {
  const token = getAdminTokenOrRedirect();
  if (!token) return null;
  return { token };
};

const getData = async () => {
  const headers = getHeadersOrRedirect();
  if (!headers) return;
  try {
    const res = await $axios({
      method: 'get',
      url: `${runtimeConfig.public.API_BASE_URL}/admin/activeChart`,
      headers,
    });
    if (res.data.success === true) {
      data.value = res.data.data;
    }
  } catch (error) {
    await handleAdminError(error);
  }
};

const toggleHighlight = async (item) => {
  const result = await promptModal(confirmMsg, { msg: '確認設定' });
  if (result && result.isConfirmed === true) {
    const headers = getHeadersOrRedirect();
    if (!headers) return;
    try {
      const res = await $axios({
        method: 'put',
        url: `${runtimeConfig.public.API_BASE_URL}/admin/activeChart`,
        headers,
        data: { _id: item._id, highlight: !item.highlight }
      });
      if (res.data.success === true) {
        const message = res.data.message;
        await openModal(okMsg, { msg: message });
        await getData();
      }
    } catch (error) {
      await handleAdminError(error);
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
        <a @click="getData"
          class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
      </div>
      <div class="overflow-x:auto">
        <table class="w:full t:center {p:16|8;}>tr>td">
          <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
            <td></td>
            <td>名稱</td>
            <td>網址</td>
          </tr>
          <template v-for="(item, index) in data" :key="`chart${index}`">
            <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
              <td>
                <div @click="toggleHighlight(item)"
                  :class="`${item.highlight === true ? 'bg:link {left:20;bg:white;}>div' : 'bg:third {bg:gray-10;left:2;}>div'}`"
                  class="cursor:pointer mx:auto w:36 h:18 r:16 transition:400ms rel">
                  <div class="w:14 h:14 r:50 abs top:2 transition:400ms"></div>
                </div>
              </td>
              <td>{{ item.name }}</td>
              <td><a :href="item.chartUrl" target="_blank" rel="noopener noreferrer" class="fg:link">{{ item.chartUrl }}</a></td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </section>
</template>

<!--
<div>
  <iframe :src="flourishEmbedUrl" allowfullscreen class="w:600 h:400"></iframe>
</div> -->