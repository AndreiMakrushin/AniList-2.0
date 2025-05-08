<script setup lang="ts">
import type { IProgressBar } from "./types";

const emit = defineEmits<{
  (e: "rewind", event: number): void;
}>();

const props = defineProps<IProgressBar>();

const progress = computed(() => {
  if (!props.videoDurationTime || !props.videoCurrentTime) return { width: "0%" };
  return {
    width: `${(props.videoCurrentTime / props.videoDurationTime) * 100}%`,
  };
});
const onRewind = (event: number) => {
  if (!props.videoDurationTime) return;
  emit("rewind", (props.videoDurationTime * event) / 1000);
};

const ranges = computed({
  get: () => {
    return ((props.videoCurrentTime ?? 0) / (props.videoDurationTime ?? 1)) * 1000;
  },
  set: (value) => {
    onRewind(Number(value));
  },
});
</script>

<template>
  <div class="relative h-[5px] bg-[#525151] rounded-[5px]">
    <div
      class="absolute z-10 h-full bg-slate-500 rounded-[5px] cursor-pointer justify-end items-center"
      :style="progress"
    ></div>

    <input
      v-model="ranges"
      type="range"
      class="w-full absolute z-20 h-full"
      step="1"
      min="0"
      max="1000"
    />
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  transition: 0.5s;
  background: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: rgb(100 116 139);
  height: 15px;
  width: 15px;
  border-radius: 50%;
  cursor: pointer;
  transition: height 0.5s, width 0.5s;
}
input[type="range"]::-moz-range-thumb {
  background-color: rgb(100 116 139);
  height: 15px;
  width: 15px;
  border-radius: 50%;
  cursor: pointer;
  transition: height 0.5s, width 0.5s;
}
</style>
