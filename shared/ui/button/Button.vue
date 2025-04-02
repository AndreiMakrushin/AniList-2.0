<script setup lang="ts">
defineProps<{
    label: string,
    classBtn?: string
    icon?: string,
    width?: number,
    height?: number
}>()
</script>

<template>
  <button type="button" :class="classBtn" class="flex flex-row gap-2 w-full duration-short">
  <SvgSprite v-if="icon" :icon="icon" :width="width" :height="height" />
    {{ label }}
  </button>
</template>


