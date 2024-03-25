<script setup>
definePageMeta({
    layout: 'login'
});

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const container = ref(null);

const getData = () => {
    const text = container.value.getText().trim();
    const html = container.value.getHTML();
    console.log(text.length, html);
}


</script>
<template>
    <div>
        test
    </div>
    <div>
        <ClientOnly>
            <QuillEditor theme="snow" ref="container" />
        </ClientOnly>
        <button @click="getData">click</button>
    </div>

</template>