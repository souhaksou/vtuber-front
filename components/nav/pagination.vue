<script setup>

const props = defineProps({
  max: {
    type: Number,
    default: () => 1
  },
  current: {
    type: Number,
    default: () => 1
  },
  length: {
    type: Number,
    defalut: () => 0
  },
  show: {
    type: Number,
    defalut: () => 0
  }
});

const current = ref(props.current);

watch(current, (newValue, oldValue) => {
  emits('current', newValue);
})

const emits = defineEmits(['current']);

const goto = (key) => {
  switch (key) {
    case -2:
      if (current.value > 1) {
        current.value = 1;
      }
      break;
    case -1:
      if (current.value > 1) {
        current.value -= 1;
      }
      break;
    case 1:
      if (current.value < props.max) {
        current.value += 1;
      }
      break;
    case 2:
      if (current.value < props.max) {
        current.value = props.max;
      }
      break;
    default:
      break;
  }
};

</script>

<template>
  <nav>
    <div class="mb:8 flex ai:center f:20 {inline-block;px:4;}>a">
      <a @click="goto(-2)"><i class="bi bi-chevron-bar-left"></i></a>
      <a @click="goto(-1)"><i class="bi bi-chevron-left"></i></a>
      <select v-model.number="current" class="px:8">
        <option v-for="i in props.max">{{ i }}</option>
      </select>
      <a @click="goto(1)"><i class="bi bi-chevron-right"></i></a>
      <a @click="goto(2)"><i class="bi bi-chevron-bar-right"></i></a>
    </div>
    <p>顯示第 {{ `${1 + (current - 1) * show} - ${current * show}` }} 筆資料</p>
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