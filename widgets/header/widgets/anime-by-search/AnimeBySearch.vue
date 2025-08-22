<script setup lang="ts">
import { useSearchAnime } from "~/shared/composables/useSearchAnime";
import type { TAnime } from "~/shared/types";
import { useDebounceFn } from "@vueuse/core";

const searchAnime = ref("");
const arrayAnime = ref<TAnime[] | null>(null);

const debouncedSearch = useDebounceFn(async (query: string) => {
  if (query.length > 3) {
    arrayAnime.value = await useSearchAnime(query);
  } else {
    arrayAnime.value = null;
  }
}, 1000);

const goPageAnime = (code: string) => {
  navigateTo(`/anime/${code}/1`);
  searchAnime.value = "";
  arrayAnime.value = null;
};
</script>

<template>
  <div class="relative flex flex-row grow gap-5">
    <Search
      v-model:model="searchAnime"
      type="text"
      class="focus:ring-cyan-300 bg-[#d8d8d8]"
      @update:model="debouncedSearch"
    />

    <div v-if="arrayAnime" class="absolute top-full left-0 z-30 mt-2 w-full">
      <ol
        class="flex flex-col gap-3 shadow-lg max-h-96 overflow-y-auto bg-gray-800 rounded-lg p-4 w-full box-border"
      >
        <li
          v-for="(anime, index) in arrayAnime"
          :key="index"
          class="flex cursor-pointer p-2 gap-3 text-white hover:bg-gray-700 transition-colors duration-200 rounded-lg items-start"
          @click="goPageAnime(anime.alias)"
        >
          <img
            :src="`https://anilibria.top${anime.poster.src}`"
            class="w-16 h-20 object-cover rounded-lg flex-shrink-0"
          />

          <div class="flex flex-col min-w-0 flex-1">
            <h2 class="font-medium text-sm truncate">
              {{ anime.name.main }}
            </h2>

            <span class="text-xs text-gray-400 truncate mt-1">
              {{ anime.name.english }}
            </span>

            <span class="text-xs text-gray-500 mt-1">
              {{ anime.season.year }}
            </span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
