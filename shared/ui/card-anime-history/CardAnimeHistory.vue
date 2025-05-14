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

    <div
      v-for="item in sortedAnimeByUpdate"
      :key="item.animeId"
      class="relative cursor-pointer flex gap-5 rounded-[10px] overflow-hidden max-h-[44 0px]"
      @click="pushToAnimePage(item.code, item.episode)"
    >
      <img
        :src="item.img === null ? '@/shared/assets/image/noAnime.png' : item.img"
        alt=""
        class="w-[100%] object-contain"
      />

      <div class="absolute bottom-0 left-0 flex flex-col bg-white w-[100%]">
        <div class="relative flex">
          <span class="w-full flex h-[5px] bg-slate-300"></span>

          <span
            class="h-[5px] bg-red-500 absolute top-0 left-0"
            :style="`width: ${(item.current_Time / item.duration_Time) * 100}%`"
          ></span>
        </div>

        <div class="px-2">
          <h1 class="text-[18px] w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {{ item.nameAnime }}
          </h1>

          <h3>Эпизод: {{ item.episode }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
