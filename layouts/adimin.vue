<script setup>
import admin from '@/components/navbarAdmin.vue';
</script>
<template>
    <header>
        <admin />
    </header>
    <section>
        <slot />
    </section>
    <footer>
        <p>footer</p>
    </footer>
</template>