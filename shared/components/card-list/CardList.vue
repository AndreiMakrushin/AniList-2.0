<script setup lang="ts">
import { defineProps } from 'vue'
import type { TAnime } from '~/shared/types';

const emit = defineEmits<{
  (e: 'push', id: number): void
}>()

defineProps<{
  anime: TAnime[] | null
}>()

const routerPushing = (e: number) => {
  emit('push', e)
}
</script>

<template>
  <article
    v-for="i in anime"
    :key="i.id"
    class="flex flex-col items-center gap-3 cursor-pointer"
    @click="routerPushing(i.id)"
  >
    <div class="relative z-0 rounded-[15px] overflow-hidden">
      <img
        :src="`https://dl-20240330-7.anilib.moe${i.posters.original.url}`"
        class="w-full h-auto"
      />

      <div
        class="flex absolute z-10 top-0 left-0 w-full h-full
        hover:bg-cardOpacity hover:text-white duration-300 items-center justify-center text-transparent"
      >
        <SvgSprite :width="50" :height="50" icon="icon-play" />
      </div>
    </div>

    <div class="flex flex-col items-center w-full">
      <h2
        class="font-medium w-full hover:text-red-500 text-white duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ i.names.ru }}
      </h2>

      <p class="font-medium text-[#ccc7c7]">{{ i.season.year }}</p>
    </div>
  </article>
</template>
