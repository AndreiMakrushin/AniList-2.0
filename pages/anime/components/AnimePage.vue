<script setup lang="ts">
import type { TAnime, } from "@/shared/types";
import Player from "~/widgets/player/Player.vue";
import { useAnimeStore } from "@/shared/stores/store";
import { animeStatus } from "~/shared/helpers/animeStatuses";
import { useSupabaseAnime } from "@/shared/helpers/useSupabaseAnime";
const props = defineProps<{
  episode: string;
  anime: TAnime | null;
}>();

const anime = ref<TAnime | null>(props.anime);
const store = storeToRefs(useAnimeStore());
const {
  addAnimeToStatus,
  addAnimeToHistory,
  updateAnimeHistory,
  getStatusAnime,
} = useSupabaseAnime();
const statusAnime = ref("");

const lastUpdate = computed(() => {
  const date = new Date(anime.value?.updated_at || 0);
  
  const day = new String(date.getDate()).padStart(2, "0");
  const month = new String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
});

const currentEpisodeList = computed(() => {
  return Object.keys(anime.value?.episodes|| {}).length || "0";
});

const animeState = computed(() => {
  const status = animeStatus.find((s) => s.id === statusAnime.value);

  return status
    ? {
        id: status.id,
        statusRu: status.statusRu,
        statusEn: status.statusEn ?? null,
      }
    : null;
});
const recordAnimeStatus = async () => {
  if (store?.user.value && animeState.value) {
    await addAnimeToStatus(store.user.value.id, {
      img: anime.value!.poster.original,
      nameAnime: anime.value!.name.main,
      animeId: anime.value!.id,
      statusId: animeState.value.id,
      statusRu: animeState.value.statusRu,
      statusEn: animeState.value.statusEn,
    });
  }
};

const loadAnimeStatus = async () => {
  if (!anime.value?.id || !store.user) return;

  try {
    statusAnime.value = await getStatusAnime(anime.value.id);
  } catch (error) {
    console.error("Ошибка загрузки статуса аниме:", error);
  }
};

watch(store.user, async () => {
  if (store.user.value) {
    await loadAnimeStatus();
  }
});

onMounted(async () => {
  if (store.user.value) {
    await loadAnimeStatus();
  }
});

const userId = computed(() => {
  return store?.user.value?.id;
});

const checkAnimeHistory = async (history: IAddAnimeToHistory) => {
  const { currentTime } = await addAnimeToHistory(history, userId.value!);

  if (history.videoElement && currentTime) {
    history.videoElement.currentTime = currentTime;
  }
};
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
              ? `https://anilibria.top${anime.poster.src}`
              : ''
          "
          :class="{ 'opacity-0': !anime }"
          alt="Постер аниме"
          loading="lazy"
        />

        <div v-if="!anime" class="absolute inset-0 bg-gray-700/50 animate-pulse"></div>
      </div>

      <div v-if="store?.user.value" class="flex">
        <DropDownSelect
          v-model="statusAnime"
          :options="animeStatus.slice(1)"
          placeholder="Добавить в список"
          @update:model-value="recordAnimeStatus"
        />
      </div>
    </div>

    <div class="flex flex-col flex-1 gap-10">
      <div class="relative">
        <div
          class="absolute z-0 inset-0 bg-black/35 backdrop-blur-sm rounded-[15px]"
        ></div>

        <div class="flex-1 relative z-10 p-5 flex flex-col gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-1">
              {{ anime?.name.main || "Загрузка..." }}
            </h1>

            <p class="text-lg text-gray-300">{{ anime?.name.english }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-gray-400">
            <span class="px-3 py-1 rounded-full bg-gray-800 text-sm font-medium">
              {{ anime?.season.description}}
            </span>

            <div class="w-1 h-1 rounded-full bg-gray-600"></div>

            <span>{{ anime?.year }}</span>

            <div class="w-1 h-1 rounded-full bg-gray-600"></div>

            <span>{{ anime?.type.value }}</span>
          </div>

          <div class="flex flex-wrap items-baseline gap-2">
            <span class="text-gray-400">Жанры:</span>

            <template v-if="anime?.genres?.length">
              <span
                v-for="genre in anime.genres"
                :key="genre.id"
                class="px-2 py-1 text-sm rounded-full bg-blue-900/50 text-blue-300"
              >
                {{ genre.name }}
              </span>
            </template>

            <span v-else class="text-gray-500">Не указаны</span>
          </div>

          <div class="flex flex-wrap items-baseline gap-2">
            <span class="text-gray-400">Озвучка:</span>

            <template v-if="anime?.members.length">
              <span
                v-for="voice in anime.members"
                :key="voice.id"
                class="px-2 py-1 text-sm rounded-full bg-purple-900/50 text-purple-300"
              >
                {{ voice.nickname }}
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
        :anime-play="anime?.episodes"
        :anime-id="anime?.id!"
        :anime-name="anime?.name.main"
        :update-history="store.user.value ? true : false"
        
        :episode="+episode"
        preview-url="https://anilibria.top"
        @add-history="checkAnimeHistory($event)"
        @real-time-update="updateAnimeHistory($event, userId!)"
      />
    </div>
  </div>
</template>

<style scoped></style>
