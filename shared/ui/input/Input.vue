<script setup lang="ts">
defineProps<{
  type?: string;
  placeholder: string;
}>();

const model = defineModel<string>("model");
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    class="py-4 rounded-lg ring-transparent duration-300 ring hover:ring-[#f5f5f5] focus:ring-[#f5f5f5] outline-none px-5 bg-[#f5f5f5] text-base leading-5 grow flex"
  />
</template>

<style scoped></style>
