<script setup lang="ts">
import { defineProps } from "vue";
import type { IHls } from "@/shared/types";

const emit = defineEmits<{
  (e: "updateQuality", event: string): void;
}>();

defineProps<{
  quality: string;
  animeQuality: { [key: string]: IHls };
}>();

const updateQuality = (event: string) => {
  emit("updateQuality", event);
};
</script>

<template>
  <ol class="flex flex-col gap-2">
    <li
      v-for="(q, key) in animeQuality"
      :key="key"
      class="cursor-pointer px-2 py-1 hover:bg-gray-700 duration-200"
      :class="{
        'bg-gray-700': quality === key,
        hidden: !q,
      }"
      @click="updateQuality(key as string)"
    >
      {{ key === "fhd" ? "1080p" : key === "hd" ? "720p" : key === "sd" ? "480p" : key }}
    </li>
  </ol>
</template>
