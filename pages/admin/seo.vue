<script setup>
definePageMeta({
    layout: 'admin'
})

import { openModal, promptModal } from 'jenesius-vue-modal';
import seoModal from '@/components/modal/seoModal.vue';
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
            url: `${runtimeConfig.public.API_BASE_URL}/admin/seo`,
            headers,
        });
        if (res.data.success === true) {
            data.value = res.data.data;
        }
    } catch (error) {
        await handleAdminError(error);
    }
};

const editSeo = async (item) => {
    const result = await promptModal(seoModal, { type: 'edit', item: item });
    if (result && result.isConfirmed === true) {
        const headers = getHeadersOrRedirect();
        if (!headers) return;
        try {
            const res = await $axios({
                method: 'put',
                url: `${runtimeConfig.public.API_BASE_URL}/admin/seo`,
                headers,
                data: result.data
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
                        <td>頁面</td>
                        <td>h1</td>
                        <td>標題</td>
                        <td>縮圖</td>
                        <td></td>
                    </tr>
                    <template v-for="(item, index) in data" :key="`seo${index}`">
                        <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                            <td>{{ item.page }}</td>
                            <td>{{ item.h1 }}</td>
                            <td>{{ item.title }}</td>
                            <td>
                                <img :src="item.imgUrl" alt="img" class="w:100 mx:auto">
                            </td>
                            <td>
                                <a @click="editSeo(item)"
                                    class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
                                    <i class="bi bi-pencil-square"></i><span>&nbsp;編輯</span>
                                </a>
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </section>
</template>