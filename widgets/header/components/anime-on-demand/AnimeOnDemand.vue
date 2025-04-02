<script setup lang="ts">
import type { TAnime } from '@/shared/types'
import { defineProps } from 'vue'
const emit = defineEmits<{
  (e: 'goPageAnime', id: number): void  
}>()

defineProps<{
  arrayAnime: TAnime
}>()

const goPageAnime = (id: number) => {
  emit('goPageAnime', id)
}
</script>

<template>
  <div class="absolute right-0 z-30 top-[50px] w-full">
    <ol class="flex flex-col gap-5 shadow-shadowDrop bg-cardOpacity rounded-[10px] p-5 w-full">
      <li
        v-for="(anime, index) in arrayAnime"
        :key="index"
        class="w-full flex flex-row gap-5 text-white hover:bg-cardOpacity2 duration-short rounded-[10px]"
        @click="goPageAnime(anime.id)"
      >
        <img
          :src="`https://dl-20211030-963.anilib.top${anime.posters.small.url}`"
          class="w-[60px] rounded-[10px]"
        />

        <div class="flex flex-col w-full">
          <h2 class="font-medium w-[70%] whitespace-nowrap text-ellipsis overflow-hidden">
            {{ anime.names.ru }}
          </h2>

          <span
            class="text-[12px] w-[70%] text-[#d8d8d8] whitespace-nowrap text-ellipsis overflow-hidden"
            >{{ anime.names.en }}</span
          >

          <span>{{ anime.season.year }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
