<script setup>
import navbar from '@/components/nav/navbar.vue';
</script>
<template>
    <div class="light bg:white w:full max-w:screen-3xl mx:auto overflow-x:hidden">
        <header>
            <navbar />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>