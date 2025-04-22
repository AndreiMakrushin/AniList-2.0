<script setup lang="ts">
import { defineProps } from 'vue'
import type { AnimePlayer } from '@/stores/types'
defineProps<{
  quality: string
  animeQuality: AnimePlayer
}>()

const emit = defineEmits(['updateQuality'])

const updateQuality = (event: string) => {
  emit('updateQuality', event)
}
</script>
<template>
  <ol>
    <li
      class="cursor-pointer px-2 py-1 hover:bg-gray-700 duration-short"
      :class="{ 'bg-gray-700': quality === key, hidden: q === null }"
      v-for="(q, key) in animeQuality"
      :key="key"
      @click="updateQuality(key)"
    >
      {{ String(key) === 'fhd' ? 1080 : String(key) === 'hd' ? 720 : 480 }}p
    </li>
  </ol>
</template>
