<script setup>
import admin from '@/components/nav/navbarAdmin.vue';
</script>
<template>
    <div class="light bg:white w:full max-w:screen-3xl mx:auto overflow-x:hidden">
        <header>
            <admin />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>