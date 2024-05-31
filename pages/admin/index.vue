<script setup>
definePageMeta({
    layout: 'admin'
});

import { openModal, promptModal } from 'jenesius-vue-modal';
import accountModal from '@/components/modal/accountModal.vue';
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
            url: `${runtimeConfig.public.API_BASE_URL}/admin/account`,
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

const editAccount = async (item) => {
    const result = await promptModal(accountModal, { item });
    if (result && result.isConfirmed === true) {
        try {
            const res = await $axios({
                method: 'put',
                url: `${runtimeConfig.public.API_BASE_URL}/admin/account`,
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
                await openModal(errorMsg, { msg: message });
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
                <a @click="getData"
                    class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">搜尋</a>
            </div>
            <div class="overflow-x:auto">
                <table class="w:full t:center {p:16|8;}>tr>td">
                    <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
                        <td>名稱</td>
                        <td>帳號</td>
                        <td></td>
                    </tr>
                    <template v-for="(item, index) in data" :key="`account${index}`">
                        <tr :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                            <td>{{ item.name }}</td>
                            <td>{{ item.account }}</td>
                            <td>
                                <a @click="editAccount(item)"
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