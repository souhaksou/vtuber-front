<script setup>
const animals = ref([
  { name: 'a', has: false },
  { name: 'b', has: false },
  { name: 'c', has: false },
  { name: 'd', has: true },
  { name: 'e', has: false },
  { name: 'f', has: false },
  { name: 'g', has: false }
]);



onMounted(() => {

});

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <div v-for="(item, index) in animals" :key="index">
        <label :for="item.name">{{ item.name }}</label>
        <input type="checkbox" :id="item.name" :value="animals[index].has">
      </div>
      <div>animals = {{ animals }}</div>
    </div>
  </section>
</template>

<!--
<div>
  <iframe :src="flourishEmbedUrl" allowfullscreen class="w:600 h:400"></iframe>
</div> -->