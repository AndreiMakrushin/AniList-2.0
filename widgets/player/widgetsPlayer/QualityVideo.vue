<script setup lang="ts">
import { defineProps } from "vue";

const emit = defineEmits<{
  (e: "updateQuality", event: string): void;
}>();

defineProps<{
  quality: string;
  animeQuality: string[]
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
        'bg-gray-700': quality === q,
        hidden: !q,
      }"
      @click="updateQuality(q as string)"
    >
      {{ q === "fhd" ? "1080p" : q === "hd" ? "720p" : q === "sd" ? "480p" : q }}
    </li>
  </ol>
</template>
