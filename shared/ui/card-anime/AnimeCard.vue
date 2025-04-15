<script setup lang="ts">
import { defineProps } from "vue";
import type { TAnime } from "@/shared/types";

defineProps<{
  anime: TAnime;
}>();
</script>

<template>
  <article class="flex flex-col items-center gap-3 cursor-pointer">
    <div class="relative z-0 rounded-[15px] overflow-hidden">
      <img
        :src="`https://dl-20240330-7.anilib.moe${anime?.posters.original.url}`"
        class="w-full h-auto"
      />

      <div
        class="flex scrollbar max-mobile:hidden flex-col gap-3 absolute z-10 top-0 p-4 overflow-y-auto left-0 w-full h-full hover:bg-cardOpacity hover:text-white duration-300 text-transparent"
      >
        <span>{{ anime?.description || "" }}</span>
        Дата выхода: {{ anime?.season.string || "" }} - {{ anime?.season.year || "" }}
      </div>
    </div>

    <div class="flex flex-col items-center w-full">
      <h2
        class="font-medium w-full text-white duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ anime?.names.ru || "" }}
      </h2>
    </div>
  </article>
</template>
