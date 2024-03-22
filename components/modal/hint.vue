<script setup>
import { popModal } from 'jenesius-vue-modal';

const props = defineProps({
    msg: String,
});

const close = () => {
    popModal();
}
</script>

<template>
    <div class="bg:black p:16|20 r:8 w:full max-w:360 b:1|solid|#90FFFF">
        <div class="flex jc:end mb:16">
            <button class="block" @click="close"><i class="bi bi-x-lg fg:white f:20"></i></button>
        </div>
        <p class="t:center p:16 r:4 f:20 fg:#282C2E f:bold bg:#FF7A7A">{{ props.msg }}</p>
        <div class="h:32"></div>
    </div>
</template>