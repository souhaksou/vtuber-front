<script setup>
import pagination from '@/components/nav/pagination.vue';

const { deepCopy } = useCopy();
const { popular } = useCheck();

const hotUrl = 'https://raw.githubusercontent.com/TaiwanVtuberData/TaiwanVTuberTrackingDataJson/master/api/v2/TW/trending-vtubers/livestream/100.json';
const hot = ref([]);
const search = ref('');
const data = computed(() => {
  current.value = 1;
  return hot.value.filter(element => element.name.includes(search.value));
});
const show = 10;
const max = computed(() => {
  return Math.ceil(data.value.length / show);
});
const current = ref(1);
const currentChange = (value) => {
  current.value = value;
};
const paginationShow = (num) => {
  if (num < current.value * show && num >= (current.value - 1) * show) {
    return true;
  }
  else {
    return false;
  }
};

const hotResult = await useFetch(hotUrl, { method: 'GET' });
if (hotResult.status.value === 'success') {
  hot.value = deepCopy(JSON.parse(hotResult.data.value).VTubers);
}

</script>

<template>
  <section class="p:32">
    <div class="max-w:screen-lg mx:auto">
      <h1 class="fg:primary f:36 f:bold t:center mb:32">標題</h1>
      <template v-if="hot.length > 0">
        <div class="flex jc:end mb:32">
          <input v-model="search" type="text" class="inline-block w:full max-w:160 p:4|18 r:4 b:1|solid|gray"
            placeholder="篩選名稱">
        </div>
        <div class="overflow-x:auto">
          <table class="w:full t:center {p:16|8;}>tr>td">
            <tr class="f:bold f:18 {by:1|solid|gray;bg:gray-10;}>td">
              <td class="w:240">名稱</td>
              <td>Youtube</td>
              <td>Twitch</td>
              <td>連結</td>
            </tr>
            <template v-for="(item, index) in data" :key="`livestream${index}`">
              <tr v-if="paginationShow(index)" :class="`${(index + 1) % 2 === 1 ? 'bg:secondary' : ''}`">
                <td>
                  <div class="flex jc:start ai:center">
                    <img :src="item.imgUrl" alt="article" class="mx:16 w:40 r:50%">
                    <p> {{ item.name }}</p>
                  </div>
                </td>
                <td>{{ item.YouTube !== undefined ? item.YouTube.popularity : '' }}</td>
                <td>{{ item.Twitch !== undefined ? item.Twitch.popularity : '' }}</td>
                <td>
                  <a :href="popular(item.popularVideo)" target="_blank" class="f:20 fg:primary inline-block px:8"><i
                      class="bi bi-play-btn-fill"></i></a>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <div>
          <pagination :length="data.length" :max="max" :show="show" :current="current" @current="currentChange" />
        </div>
      </template>
      <template v-else>
        <p class="t:center f:20">無資料</p>
      </template>
    </div>
  </section>
</template>