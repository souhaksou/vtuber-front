<script setup>
import { Modal, closeModal, pushModal, onBeforeModalClose } from 'jenesius-vue-modal';

import textMsg from '@/components/modal/textMsg.vue';

const props = defineProps({
    type: String,
    item: Object,
    index: Number
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

const id = ref('')

onMounted(() => {
    if (props.type === 'edit') {
        const temp = props.item[props.index];
        name.value = temp.name;
        id.value = temp._id;
    }
});

const confirm = async () => {
    if (name.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入名稱' });
        return;
    }
    const check = props.item.some(item => item.name === name.value);
    if (check === true) {
        await pushModal(textMsg, { msg: `${name.value} 已經存在` });
        return;
    }
    const res = {
        isConfirmed: true,
        data: {
            name: name.value
        }
    };
    if (props.type === 'edit') {
        res.data._id = id.value;
    }
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