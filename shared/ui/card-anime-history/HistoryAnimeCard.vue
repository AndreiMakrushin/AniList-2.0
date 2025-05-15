<script setup lang="ts">
import { defineProps } from "vue";
import type { IAddAnime } from "@/shared/types";

defineProps<{
  anime: IAddAnime;
}>();
</script>

<template>
  <div
    class="relative cursor-pointer flex gap-5 rounded-[10px] hover:scale-[1.05] duration-short overflow-hidden"
  >
    <img
      :src="anime.img === null ? '@/shared/assets/image/noAnime.png' : anime.img"
      alt=""
      class="w-[100%] object-contain"
    />

    <div class="absolute bottom-0 left-0 flex flex-col bg-white w-[100%]">
      <div class="relative flex">
        <span class="w-full flex h-[5px] bg-slate-300"></span>

        <span
          class="h-[5px] bg-red-500 absolute top-0 left-0"
          :style="`width: ${(anime.current_Time / anime.duration_Time) * 100}%`"
        ></span>
      </div>

      <div class="px-2">
        <h1 class="text-[18px] w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {{ anime.nameAnime }}
        </h1>

        <h3>Эпизод: {{ anime.episode }}</h3>
      </div>
    </div>
  </div>
</template>
