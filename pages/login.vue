<script setup>
definePageMeta({
    layout: 'login'
});

import { openModal } from "jenesius-vue-modal";
import errorMessage from '@/components/modal/errorMessage.vue';

const data = ref({
    account: '',
    password: ''
});
const showPassword = ref(false);

const submit = async () => {
    if (data.value.account.length === 0) {
        await openModal(errorMessage, { msg: '請輸入帳號' });
        return;
    }
    if (data.value.password.length === 0) {
        await openModal(errorMessage, { msg: '請輸入密碼' });
        return;
    }
    // openModal(errorMessage, { msg: 'error' });
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
            <a @click="submit"
                class="block w:full t:center p:8|16 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">送出</a>
        </div>
    </section>
</template>