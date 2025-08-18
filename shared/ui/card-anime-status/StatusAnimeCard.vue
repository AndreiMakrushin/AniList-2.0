<script setup lang="ts">
import type { IAnimeStatus } from "@/shared/types";

defineProps<{
  anime: IAnimeStatus;
}>();
</script>

<template>
  <article
    class="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-fit"
  >
    <img
      :src="`https://dl-20211030-963.anilib.top${anime.img}`"
      :alt="anime.nameAnime"
      class="w-full aspect-[3/4] object-cover"
      loading="lazy"
    />

    <div class="text-center">
      <h3 class="font-medium text-gray-900 line-clamp-2">
        {{ anime.nameAnime }}
      </h3>
    </div>
  </article>
</template>

<style scoped></style>
