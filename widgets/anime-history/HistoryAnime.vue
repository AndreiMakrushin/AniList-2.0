<script setup lang="ts">
import { defineProps } from "vue";
import type { IAddAnime } from "@/shared/types";

const props = defineProps<{
  anime: IAddAnime[] | null;
}>();

const pushToAnimePage = (code: string, episode: number) => {
  navigateTo(`/anime/${code}/${episode}`);
};

const sortedAnimeByUpdate = computed(() => {
  return props.anime
    ?.filter((item: IAddAnime) => item.updated !== null)
    .sort((a: IAddAnime, b: IAddAnime) => {
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);
      return dateB.getTime() - dateA.getTime();
    });
});
</script>

<template>
  <div class="flex flex-col gap-5 mb-[30px]">
    <span class="text-white text-[18px]">История просмотра</span>

    <div class="grid grid-cols-3 gap-5 max-pads:grid-cols-2 max-mobile:grid-cols-1">
      <HistoryAnimeCard
        v-for="item in sortedAnimeByUpdate"
        :key="item.animeId"
        :anime="item"
        @click="pushToAnimePage(item.code, item.episode)"
      />
    </div>
  </div>
</template>
