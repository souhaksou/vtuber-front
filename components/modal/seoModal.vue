<script setup>
import { Modal, closeModal, pushModal, onBeforeModalClose } from 'jenesius-vue-modal';

import textMsg from '@/components/modal/textMsg.vue';

const props = defineProps({
    type: String,
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
const page = ref('');
const h1 = ref('');
const title = ref('');
const description = ref('');
const imgUrl = ref('');
const type = ref('');
const author = ref('');


onMounted(() => {
    if (props.type === 'edit') {
        page.value = props.item.page;
        h1.value = props.item.h1;
        title.value = props.item.title;
        description.value = props.item.description;
        imgUrl.value = props.item.imgUrl;
        type.value = props.item.type;
        author.value = props.item.author;
    }
});

const confirm = async () => {
    if (title.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入標題' });
        return;
    }
    const res = {
        isConfirmed: true,
        data: {
            h1: h1.value,
            title: title.value,
            description: description.value,
            imgUrl: imgUrl.value,
            type: type.value,
            author: author.value
        }
    };
    if (props.type === 'edit') {
        res.data._id = props.item._id;
    }
    emit(Modal.EVENT_PROMPT, res);
};

</script>

<template>
    <div class="bg:white p:16|20 r:8 w:full max-w:360 h:full max-h:calc(100vh-32px)">
        <div class="flex jc:end mb:16">
            <button class="block" @click="close"><i class="bi bi-x-lg fg:black f:20"></i></button>
        </div>
        <p class="mb:8">頁面</p>
        <input type="text" disabled class="block w:full p:4|8 r:4 bg:gray-10 mb:16" v-model="page">
        <p class="mb:8">h1</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="h1">
        <p class="mb:8">標題</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="title">
        <p class="mb:8">描述</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="description">
        <p class="mb:8">網址</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="imgUrl">
        <p class="mb:8">種類</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="type">
        <p class="mb:8">作者</p>
        <input type="text" class="block w:full p:4|8 r:4 b:1|solid|gray mb:16" v-model="author">
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