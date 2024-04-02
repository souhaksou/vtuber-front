<script setup>
definePageMeta({
    layout: 'login'
});

const getData = async () => {
    try {
        const response = await $fetch('https://randomuser.me/api/', {
            method: 'GET',
        });
        console.log('success', response);
    } catch (error) {
        console.error(error);
    }
};

// const data = ref(1);
const result = await useFetch('https://randomuser.me/api/');
console.log(result.status.value);
// data.value = result.data.value;
// onMounted(() => {
//     console.log(data.value);
// }),

</script>

<template>
    <section class="w:full h:100vh flex flex:col jc:center ai:center">
        <p>test</p>
        <p class="fg:red">{{ result.data }}</p>
        <div>
            <button @click="getData">click</button>
        </div>
    </section>
</template>