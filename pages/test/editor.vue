<script setup>
definePageMeta({
    layout: 'nothing'
});

import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// 編輯器實例必須用 shallowRef
const editorRef = shallowRef();

// HTML的內容
const valueHtml = ref('<p></p>');

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

const getValue = () => {
    // editor.getHtml();
};

</script>
<template>
    <div>
        test
    </div>
    <ClientOnly>
        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>
        <div class="my:32">
            <button @click="getValue" class="inline-block p:4|16 r:4 b:1|solid|black">click</button>
        </div>
        <div v-html="valueHtml"></div>
    </ClientOnly>

</template>

<style scoped></style>