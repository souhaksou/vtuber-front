<script setup>
import navbar from '@/components/navbar.vue';
</script>
<template>
    <header>
        <navbar />
    </header>
    <section>
        <slot />
    </section>
    <footer>
        <p>footer</p>
    </footer>
</template>