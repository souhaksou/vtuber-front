<template>
  <nav class="flex ai:center">
    <a><i class="bi bi-chevron-bar-left"></i></a>
    <a><i class="bi bi-chevron-left"></i></a>
    <a><i class="bi bi-chevron-right"></i></a>
    <a><i class="bi bi-chevron-bar-right"></i></a>
  </nav>

  <!-- <template v-if="filterData">
    <div class="mt:16 flex jc:end ai:center f:14">
      <q-pagination v-model="current" :max="max" input color="grey" class="mr:8" />
      <p>顯示第 {{ `${1 + (current - 1) * 15} - ${current * 15}` }} 筆資料</p>
      <div class="hide mx:16 w:1 h:12 bg:#2B2B2B block@sm"></div>
      <p>共 {{ filterData.length > 0 ? filterData.length : 0 }} 筆</p>
    </div>
    const max = computed(() => {
  return Math.ceil(filterData.value.length / 15);
});
const current = ref(1);
const pagination = (num) => {
  if (num < current.value * 15 && num >= (current.value - 1) * 15) {
    return true;
  }
  else {
    return false;
  }
};
  </template> -->
</template>