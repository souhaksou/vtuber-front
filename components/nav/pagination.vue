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
    <div class="mb:16 flex jc:center ai:center {inline-block;px:4;}>a">
      <a @click="goto(-2)"><i class="bi bi-chevron-bar-left"></i></a>
      <a @click="goto(-1)"><i class="bi bi-chevron-left"></i></a>
      <select v-model.number="current" class="px:8">
        <option v-for="i in props.max">{{ i }}</option>
      </select>
      <a @click="goto(1)"><i class="bi bi-chevron-right"></i></a>
      <a @click="goto(2)"><i class="bi bi-chevron-bar-right"></i></a>
    </div>
    <div class="flex jc:end ai:center f:14">
      <p>顯示第 {{ `${1 + (current - 1) * show} - ${current * show}` }} 筆資料</p>
      <div class="w:16"></div>
      <p>共 {{ length }} 筆</p>
    </div>
  </nav>
</template>