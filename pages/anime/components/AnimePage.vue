<script setup lang="ts">
import type { TAnime } from "@/shared/types";
import Player from "~/widgets/player/Player.vue";
import { useAnimeStore } from "@/shared/stores/store";

const props = defineProps<{
  episode: string;
  anime: TAnime;
}>();

const anime = ref<TAnime | null>(props.anime);
const store = storeToRefs(useAnimeStore());

const lastUpdate = computed(() => {
  const date = new Date((anime.value?.updated as number) * 1000);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
});

const currentEpisodeList = computed(() => {
  return Object.keys(anime.value?.player?.list || {}).length || "0";
});
</script>

<template>
  <div class="w-full flex flex-row gap-5 p-4 text-white">
    <!-- Левая колонка (постер) -->
    <div class="w-full md:w-[300px] max-pads:hidden flex-shrink-0 flex flex-col gap-5">
      <div class="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800/50">
        <img
          class="w-full h-full object-cover transition-opacity duration-300"
          :src="
            anime
              ? `https://dl-20211030-963.anilib.top${anime?.posters.original.url}`
              : ''
          "
          :class="{ 'opacity-0': !anime }"
          alt="Постер аниме"
          loading="lazy"
        />

        <div v-if="!anime" class="absolute inset-0 bg-gray-700/50 animate-pulse"></div>
      </div>

      <!-- DropDown можно раскомментировать при необходимости -->
      <!-- <DropDown v-if="animeStore?.user" class="hidden md:block" ... /> -->
    </div>

    <div class="flex flex-col flex-1 gap-10">
      <div class="relative">
        <div
          class="absolute z-0 inset-0 bg-black/35 backdrop-blur-sm rounded-[15px]"
        ></div>

        <div class="flex-1 relative z-10 p-5 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-1">
              {{ anime?.names.ru || "Загрузка..." }}
            </h1>

            <p class="text-lg text-gray-300">{{ anime?.names.en }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-gray-400">
            <span class="px-3 py-1 rounded-full bg-gray-800 text-sm font-medium">
              {{ anime?.status.string }}
            </span>

            <div class="w-1 h-1 rounded-full bg-gray-600"></div>

            <span>{{ anime?.season.year }}</span>

            <div class="w-1 h-1 rounded-full bg-gray-600"></div>

            <span>{{ anime?.type.string }}</span>
          </div>

          <div class="flex flex-wrap items-baseline gap-2">
            <span class="text-gray-400">Жанры:</span>

            <template v-if="anime?.genres?.length">
              <span
                v-for="genre in anime.genres"
                :key="genre"
                class="px-2 py-1 text-sm rounded-full bg-blue-900/50 text-blue-300"
              >
                {{ genre }}
              </span>
            </template>

            <span v-else class="text-gray-500">Не указаны</span>
          </div>

          <div class="flex flex-wrap items-baseline gap-2">
            <span class="text-gray-400">Озвучка:</span>

            <template v-if="anime?.team?.voice?.length">
              <span
                v-for="voice in anime.team.voice"
                :key="voice"
                class="px-2 py-1 text-sm rounded-full bg-purple-900/50 text-purple-300"
              >
                {{ voice }}
              </span>
            </template>

            <span v-else class="text-gray-500">Не указана</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div class="flex flex-wrap gap-1">
              <span class="text-gray-400">Эпизоды:</span>

              <span class="text-white">{{ currentEpisodeList }}</span>

              <span class="text-gray-400">из</span>

              <span class="text-white">{{ anime?.type?.episodes || "?" }}</span>
            </div>

            <div>
              <span class="text-gray-400">Обновление:</span>

              <span class="text-white ml-1">{{ lastUpdate || "Неизвестно" }}</span>
            </div>
          </div>

          <div class="mt-2">
            <h3 class="text-lg font-medium text-gray-300 mb-2">Описание</h3>

            <p class="text-gray-200 leading-relaxed">
              {{ anime?.description || "Описание отсутствует" }}
            </p>
          </div>
        </div>
      </div>

      <Player
        :anime-play="anime?.player"
        :anime-id="anime?.id"
        :anime-name="anime?.names.ru"
        :user="store.user.value"
        :anime-code="anime?.code!"
        :episode="+episode"
        preview-url="https://dl-20211030-963.anilib.top"
        seria-url="https://cache.libria.fun"
      />
    </div>
  </div>
</template>

<style scoped></style>
