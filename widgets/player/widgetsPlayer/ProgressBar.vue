<script setup lang="ts">
import { defineProps, defineEmits, watch, ref, computed } from 'vue'

const props = defineProps<{
  videoCurrentTime?: number
  videoDurationTime?: number
  style?: object | undefined
}>()

const emit = defineEmits(['rewind'])

const progress = computed(() => {
  if (!props.videoDurationTime || !props.videoCurrentTime) return
  return {
    width: `${(props.videoCurrentTime / props.videoDurationTime) * 100}%`
  }
})
const onReving = (event: number) => {
  if (!props.videoDurationTime || !props.videoCurrentTime) return
  emit('rewind', (props.videoDurationTime * event) / 1000)
}

const ranges = computed({
  get: () => {
    if (!props.videoDurationTime || !props.videoCurrentTime) {
      return 0
    } else {
      return (props.videoCurrentTime / props.videoDurationTime) * 1000
    }
  },
  set: (value: number) => {
    onReving(value)
  }
})
</script>

<template>
  <div class="relative h-[5px] duration-short bg-[#525151] rounded-[5px]">
    <div
      class="absolute z-10 h-full duration-short bg-slate-500 rounded-[5px] cursor-pointer justify-end items-center"
      :style="progress"
    ></div>
    <input
      type="range"
      class="w-full absolute z-20 h-full"
      step="1"
      min="0"
      max="1000"
      v-model="ranges"
    />
  </div>
</template>

<style scoped>
/* -webkit-appearance: none; */
input[type='range'] {
  -webkit-appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  transition: 0.5s;
  background: none;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  --tw-bg-opacity: 1;
  background-color: rgb(100 116 139 / var(--tw-bg-opacity));
  height: 15px;
  width: 15px;
  border-radius: 50%;
  cursor: pointer;
  transition:
    height 0.5s,
    width 0.5s;
}
</style>
