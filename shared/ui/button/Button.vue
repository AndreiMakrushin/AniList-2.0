<script setup lang="ts">
import SvgSprite from "~/shared/ui/sprite-svg/SvgSprite.vue";
defineProps<{
    label: string,
    disabled?: boolean
    classBtn?: string
    icon?: string,
    width?: number,
    height?: number
}>()
</script>

<template>
  <button type="button" :disabled="disabled" :class="{'bg-slate-400': disabled}" class="flex flex-row gap-2 w-full rounded-lg duration-short">
  <SvgSprite v-if="icon" :icon="icon" :width="width" :height="height" />
    {{ label }}
  </button>
</template>


