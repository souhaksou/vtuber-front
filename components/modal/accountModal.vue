<script setup>
import { Modal, closeModal, pushModal, onBeforeModalClose } from 'jenesius-vue-modal';

import textMsg from '@/components/modal/textMsg.vue';

const props = defineProps({
    item: Object
});

const emit = defineEmits();

const close = () => {
    closeModal();
};

onBeforeModalClose((event) => {
    if (event.background) return false;
});

// emit
const name = ref('');
const password = ref('');
const _id = ref('');

// readonly
const account = ref('');

const showPassword = ref(false);

onMounted(() => {
    name.value = props.item.name;
    _id.value = props.item._id;
    account.value = props.item.account;
});

const confirm = async () => {
    if (name.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入名稱' });
        return;
    }
    if (password.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入密碼' });
        return;
    }
    const res = {
        isConfirmed: true,
        data: {
            _id: _id.value,
            name: name.value,
            password: password.value
        }
    };
    emit(Modal.EVENT_PROMPT, res);
};

</script>

<template>
    <div class="bg:white p:16|20 r:8 w:full max-w:360">
        <div class="flex jc:end mb:16">
            <button class="block" @click="close"><i class="bi bi-x-lg fg:black f:20"></i></button>
        </div>
        <p class="mb:8">名稱</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="name">
        <p class="mb:8">帳號</p>
        <input disabled type="text" class="block w:full p:4|8 r:4 bg:gray-10 mb:16" v-model="account">
        <p class="mb:8">密碼</p>
        <div class="rel mb:16">
            <input :type="`${showPassword === false ? 'password' : 'text'}`"
                class="block w:full p:4|8 r:4 b:1|solid|gray" v-model="password">
            <a class="abs top:50% right:8 translateY(-50%)" @click="showPassword = !showPassword">
                <i class="bi" :class="`${showPassword === false ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`"></i>
            </a>
        </div>
        <div class="h:16"></div>
        <div class="flex jc:center ai:center">
            <a @click="confirm"
                class="inline-block p:4|8 r:4 fg:white bg:blue b:1|solid|blue transition:400ms {fg:blue;bg:transparent;}:hover">
                確定
            </a>
            <div class="w:16"></div>
            <a @click="close"
                class="inline-block p:4|8 r:4 fg:white bg:red b:1|solid|red transition:400ms {fg:red;bg:transparent;}:hover">
                取消
            </a>
        </div>
        <div class="h:32"></div>
    </div>
</template>