<script setup>
import navbar from '@/components/navbar.vue';
</script>
<template>
    <div class="light">
        <header>
            <navbar />
        </header>
        <section>
            <slot />
        </section>
        <footer>
            <p>footer</p>
        </footer>
    </div>
</template>