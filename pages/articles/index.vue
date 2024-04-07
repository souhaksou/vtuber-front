<script setup>
const searchOption = ref('');
</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">文章列表</h1>
      <!-- 搜尋 -->
      <div class="flex jc:space-between ai:center mb:32">
        <div class="flex ai:center">
          <div class="flex ai:center">
            <p class="f:bold">選項</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray" v-model="searchOption">
              <option value="">無</option>
              <option value="category">分類</option>
              <option value="tag">標籤</option>
            </select>
          </div>
          <div v-show="searchOption === 'category'" class="flex ai:center">
            <div class="w:32"></div>
            <p class="f:bold">大分類</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `分類${i}` }}</option>
            </select>
            <div class="w:32"></div>
            <p class="f:bold">小分類</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `分類${i}` }}</option>
            </select>
          </div>
          <div v-show="searchOption === 'tag'" class="flex ai:center">
            <div class="w:32"></div>
            <p class="f:bold">標籤</p>
            <div class="w:16"></div>
            <select class="inline-block p:4|18 r:4 b:1|solid|gray">
              <option value="">全部</option>
              <option v-for="i in 5" :key="i" :value="i">{{ `標籤${i}` }}</option>
            </select>
          </div>
        </div>
        <div class="flex ai:center">
          <a
            class="inline-block p:4|8 r:4 fg:white bg:primary b:1|solid|primary transition:400ms {fg:primary;bg:transparent;}:hover">
            搜尋</a>
          <div class="w:32"></div>
          <input type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray" placeholder="篩選名稱">
        </div>
      </div>
      <!-- 文章 -->
      <div class="bg:secondary p:32 grid-cols:1 gap:32">
        <div class="flex jc:space-between ai:center" v-for="i in 1" :key="i">
          <div class="w:full max-w:screen-xs">
            <h2 class="f:24 mb:8">
              <a class="fg:link">[資訊整理] 台灣VTUBER產業發展現況</a>
            </h2>
            <p class="f:14 mb:16">2024-02-28 經驗分享, 資訊整理</p>
            <p>台灣VTuber產業怎麼分工？有哪些企業投入？發展現況如何？本文帶你看。 日本兩大VTuber經紀公司巨擘AN…</p>
          </div>
          <img class="max-w:200"
            src="https://i0.wp.com/r-lover.com/wp-content/uploads/2024/02/IMG_20240224_131827.jpg?resize=240%2C180&ssl=1"
            alt="img">
        </div>
      </div>
      <!-- pagination -->
    </div>
  </section>
</template>