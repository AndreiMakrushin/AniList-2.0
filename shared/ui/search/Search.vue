<script setup lang="ts">
defineProps<{
  style?: string
}>()

const model = defineModel('model')
</script>

<template>
  <input
    v-model="model"
    class="flex grow font-medium text-[15px] text-gray-700 pl-[10px] rounded-[5px] outline-none focus:ring-[1px]"
    :class="style"
  />
</template>

<style scoped></style>
