<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

const imgUrl = (path) => {
  return new URL(path, import.meta.url).href;
};
</script>
<template>
  <section>
    <!-- banner -->
    <div>
      <Carousel :items-to-show="2.5" :wrap-around="true">
        <Slide v-for="item in  5" :key="item">
          <div class="carousel__item">
            <img :src="`../assets/images/banner${item}.jpg`" alt="img">
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>