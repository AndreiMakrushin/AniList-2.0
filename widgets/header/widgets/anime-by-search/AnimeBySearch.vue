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
  navigateTo(`/anime/${code}`);
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

    <div
      v-if="arrayAnime"
      class="absolute bottom-0 right-0 z-30 transform translate-y-[calc(100%+10px)] w-full"
    >
      <ol
        class="flex flex-col gap-5 shadow-shadowDrop bg-cardOpacity rounded-[10px] p-5 w-full"
      >
        <li
          v-for="(anime, index) in arrayAnime"
          :key="index"
          class="w-full flex cursor-pointer flex-row gap-5 text-white hover:bg-cardOpacity2 duration-short rounded-[10px]"
          @click="goPageAnime(anime.code)"
        >
          <img
            :src="`https://dl-20211030-963.anilib.top${anime.posters.small.url}`"
            class="w-[60px] rounded-[10px]"
          />

          <div class="flex flex-col w-full">
            <h2
              class="font-medium w-[70%] whitespace-nowrap text-ellipsis overflow-hidden"
            >
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
  </div>
</template>
