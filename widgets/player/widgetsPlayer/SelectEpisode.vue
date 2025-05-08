<script setup lang="ts">
const emit = defineEmits<{
  (e: "update", event: number): void;
}>();
defineProps<{
  episode: number;
  selected: number;
}>();
const isOpen = ref<boolean>(false);

const open = () => {
  isOpen.value = !isOpen.value;
};
const close = (event: number) => {
  emit("update", event);
  isOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col text-white w-[90px]">
    <span class="px-1 bg-gray-500 rounded-[5px] cursor-pointer" @click="open"
      >{{ selected }} Серия</span
    >

    <div
      v-if="isOpen"
      class="flex flex-col max-h-[180px] overflow-y-auto w-full border-t-1 border-white rounded-[5px] bg-gray-500 mt-1 scrollBar"
    >
      <p
        v-for="e in episode"
        :key="e"
        class="cursor-pointer hover:bg-gray-700 px-1 duration-short"
        @click="close(e)"
      >
        {{ e }} Серия
      </p>
    </div>
  </div>
</template>

<style scoped>
.scrollBar::-webkit-scrollbar {
  width: 3px;
  border-radius: 2px;
}
.scrollBar {
  scrollbar-color: white;
  border-radius: 2px;
}
.scrollBar::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 2px;
}
</style>
