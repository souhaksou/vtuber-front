<script setup>
definePageMeta({
    layout: 'nothing',
});

import { openModal } from "jenesius-vue-modal";
import textMsg from '@/components/modal/textMsg.vue';
import errorMsg from '@/components/modal/errorMsg.vue';
import VueClientRecaptcha from 'vue-client-recaptcha';
import { parseApiError } from '@/utils/parseApiError';

const router = useRouter();
const { setAdminToken } = useAdminToken();

const data = ref({
    account: '',
    password: ''
});
const showPassword = ref(false);
const isSubmitting = ref(false);

const captchaInput = ref('');
const captchaCheck = ref(null);
const getCaptchaCode = (value) => {
    captchaCheck.value = value;
};

const { $axios } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();

const submit = async () => {
    if (isSubmitting.value) return;
    if (data.value.account.length === 0) {
        await openModal(textMsg, { msg: '請輸入帳號' });
        return;
    }
    if (data.value.password.length === 0) {
        await openModal(textMsg, { msg: '請輸入密碼' });
        return;
    }
    if (captchaInput.value.length === 0) {
        await openModal(textMsg, { msg: '請輸入驗證碼' });
        return;
    }
    if (captchaInput.value !== captchaCheck.value) {
        await openModal(textMsg, { msg: '驗證碼錯誤' });
        return;
    }
    isSubmitting.value = true;
    try {
        const res = await $axios({
            method: 'post',
            url: `${runtimeConfig.public.API_BASE_URL}/admin/login`,
            data: data.value,
            timeout: 10000
        });
        if (res.data.success === true) {
            const { token, expirationDate } = res.data;
            setAdminToken(token, expirationDate);
            router.push('/admin');
        }
    } catch (error) {
        console.error(error);
        const parsedError = parseApiError(error);
        await openModal(errorMsg, { msg: parsedError.message });
    } finally {
        isSubmitting.value = false;
    }
};

</script>

<template>
    <section class="h:100vh bg:secondary p:32 flex jc:center ai:center">
        <div class="w:full max-w:screen-3xs bg:white p:32 r:4">
            <p class="f:32 f:bold fg:primary t:center mb:32">登入</p>
            <p class="f:20 mb:16">帳號</p>
            <input type="text" class="block w:full f:20 p:8|16 r:4 b:1|solid|gray mb:32" v-model="data.account">
            <p class="f:20 mb:16">密碼</p>
            <div class="rel">
                <input :type="`${showPassword === false ? 'password' : 'text'}`"
                    class="block w:full f:20 p:8|16 r:4 b:1|solid|gray mb:32" v-model="data.password">
                <a class="abs top:50% right:8 translateY(-50%)" @click="showPassword = !showPassword">
                    <i class="bi" :class="`${showPassword === false ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`"></i>
                </a>
            </div>
            <p class="f:20 mb:16">驗證碼</p>
            <div class="mb:32 flex jc:space-between ai:center">
                <div class="w:full max-w:45%">
                    <input type="text" class="block w:full f:20 p:8|16 r:4 b:1|solid|gray" v-model="captchaInput">
                </div>
                <div class="w:16"></div>
                <div class="w:50%">
                    <VueClientRecaptcha @getCode="getCaptchaCode" :count="4" chars="1234567890" :hideLines="true"
                        custom-text-color="black" class="flex jc:end ai:center">
                    </VueClientRecaptcha>
                </div>
            </div>
            <a @click="submit" :class="isSubmitting ? 'opacity:.5 cursor:not-allowed' : ''"
                class="block w:full t:center p:8|16 r:4 f:20 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">{{ isSubmitting ? '送出中...' : '送出' }}</a>
        </div>
    </section>
</template>