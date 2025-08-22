<script setup lang="ts">
import type { IAnimeCard } from "@/shared/types";

const props = defineProps<{
  anime: IAnimeCard | null;
}>();

const hasAnyData = computed(() => {
  return (
    props.anime &&
    (props.anime.poster || props.anime.name?.main || props.anime.name?.english)
  );
});
</script>

<template>
  <article
    class="flex flex-col items-center gap-3 cursor-pointer w-full"
    :class="[
      'flex flex-col items-center gap-3 w-full',
      {
        'cursor-pointer': hasAnyData,
        'pointer-events-none': !hasAnyData,
        'animate-pulse': !hasAnyData,
        'transition duration-300 ease-in-out transform': hasAnyData,
      },
    ]"
  >
    <div class="relative w-full aspect-[3/4.248] rounded-[15px] overflow-hidden">
      <div
        v-if="!anime?.poster"
        class="absolute inset-0 bg-gray-200 dark:bg-gray-700 before:absolute before:inset-0 before:bg-[length:200%_100%] before:bg-gradient-to-r before:from-gray-200 before:via-gray-300 before:to-gray-200 dark:before:from-gray-700 dark:before:via-gray-600 dark:before:to-gray-700 before:animate-shimmer z-0"
      ></div>

      <img
        v-if="anime?.poster"
        :src="anime.poster"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      />

      <div
        v-if="anime?.description"
        class="flex scrollbar max-mobile:hidden flex-col gap-3 absolute z-20 top-0 p-4 overflow-y-auto left-0 w-full h-full hover:bg-cardOpacity hover:text-white duration-300 text-transparent"
      >
        <span>{{ anime.description }}</span>

        <span>Дата выхода: {{ anime.season.string }} - {{ anime.season.year }}</span>
      </div>
    </div>

    <div class="flex flex-col items-center w-full min-h-6">
      <div
        v-if="!anime?.name?.main && !anime?.name?.english"
        class="w-full h-6 rounded-[15px] bg-gray-200 dark:bg-gray-700"
      ></div>

      <h2
        v-else
        class="font-medium w-full text-white whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ anime?.name.main ?? anime?.name.english }}
      </h2>
    </div>
  </article>
</template>
