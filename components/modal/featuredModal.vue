<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
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
const text = ref('');

onMounted(() => {
    if (props.type === 'edit') {
        text.value = props.item.text;
    }
});

// 編輯器實例必須用 shallowRef
const editorRef = shallowRef();

// HTML的內容
const mode = 'default';
const toolbarConfig = {};
const editorConfig = { placeholder: '請輸入內容' };

// 銷毀編輯器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor) => {
    editorRef.value = editor; // 紀錄 editor 實例
};

const confirm = async () => {
    if (text.value.length === 0) {
        await pushModal(textMsg, { msg: '請輸入內容' });
        return;
    }
    const res = {
        isConfirmed: true,
        data: {
            text: text.value
        }
    };
    if (props.type === 'edit') {
        res.data._id = props.item._id;
    }
    emit(Modal.EVENT_PROMPT, res);
};

</script>

<template>
    <div class="bg:white p:16|20 r:8 w:full max-w:screen-lg h:full max-h:calc(100vh-32px)">
        <div class="flex jc:end mb:16">
            <button class="block" @click="close"><i class="bi bi-x-lg fg:black f:20"></i></button>
        </div>
        <p class="mb:8">內容</p>
        <ClientOnly>
            <div style="border: 1px solid #ccc">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 600px; overflow-y: hidden;" v-model="text" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
            </div>
        </ClientOnly>
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