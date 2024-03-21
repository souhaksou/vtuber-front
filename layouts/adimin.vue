<script setup>
import admin from '@/components/navbarAdmin.vue';
</script>
<template>
    <div class="light">
        <header>
            <admin />
        </header>
        <section>
            <slot />
        </section>
        <footer>
            <p>footer</p>
        </footer>
    </div>

</template>