<script setup>
definePageMeta({
    layout: 'login'
});

import pagination from '@/components/nav/pagination.vue';

const length = ref(15);
const show = 10;
const max = ref(3);
// const max = computed(() => {
//     return Math.ceil(data.value.length / show);
// });
const current = ref(1);
const currentChange = (value) => {
    current.value = value;
};

// const pagination = (num) => {
//     if (num < current.value * show && num >= (current.value - 1) * show) {
//         return true;
//     }
//     else {
//         return false;
//     }
// };

</script>
<template>
    <section class="w:full h:100vh flex flex:col jc:center ai:center">
        <p><span>current = </span><span>{{ current }}</span></p>
        <pagination :length="length" :max="max" :show="show" :current="current" @current="currentChange" />
    </section>

</template>