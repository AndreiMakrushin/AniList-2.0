<script setup lang="ts">
import { useSupabaseAuth } from "@/shared/helpers/useSupabaseAuth";
import { useSupabaseAnime } from "@/shared/helpers/useSupabaseAnime";
import type { IAddAnime, IAnimeStatus } from "@/shared/types";
import HistoryAnime from "~/widgets/anime-history";
import { registrationPeriod } from "~/shared/helpers/registrationPeriod";
import { animeStatus } from "~/shared/helpers/animeStatuses";

import { useAnimeStore } from "@/shared/stores/store";

const props = defineProps<{
  id: string;
  statusCode: string;
}>();

const { user } = storeToRefs(useAnimeStore());

const { deleteUserAvatar } = useSupabaseAuth();
const { getAnimeToHistory, getAnimeToStatus } = useSupabaseAnime();

const animeList = ref<IAddAnime[] | IAnimeStatus[] | null>(null);

const deleteAvatar = async () => {
  await deleteUserAvatar(props.id);
};

const isLoading = ref(false);
const error = ref<unknown | null>(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const data =
      props.statusCode === "history"
        ? await getAnimeToHistory(props.id)
        : await getAnimeToStatus(props.statusCode, props.id);

    if (data) {
      animeList.value = data;
    }
  } catch (err) {
    error.value = err;
    console.error("Ошибка загрузки:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="p-5 w-[80%] mx-auto">
    <div class="block bg-white shadow-shadowDrop rounded-[15px] p-5 mb-5">
      <div
        class="flex flex-row gap-10 max-pads:gap-5 max-pads:flex-col max-pads:items-center"
      >
        <Avatar
          :img="user?.avatar_url"
          class="max-h-[140px] aspect-square"
          @click="deleteAvatar"
        />

        <div class="flex flex-col gap-2">
          <span class="text-2xl font-bold max-pads:text-base">{{ user?.name }}</span>

          <span
            class="rounded-full text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-3 py-1 font-medium shadow-sm"
          >
            Ты с нами уже: {{ registrationPeriod(user?.created_at!) }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-5 max-pads:flex max-pads:flex-col">
      <div
        class="bg-white sticky top-24 shadow-shadowDrop rounded-[15px] h-fit p-5 mb-5 flex flex-col overflow-scroll gap-3 max-pads:flex max-pads:flex-row max-pads:gap-3"
      >
        <NuxtLink
          v-for="status in animeStatus"
          :key="status.id"
          :to="`/lk/${id}/${status.id}`"
          :class="[
            'px-3 py-2 rounded-lg transition-all text-nowrap duration-200 cursor-pointer',
            statusCode === status.id
              ? 'bg-[#f5f0ff] text-[#7e22ce] font-medium border-none'
              : 'text-[#6b7280] hover:bg-[#f8f5ff]',
          ]"
        >
          {{ status.statusRu }}
        </NuxtLink>
      </div>

      <HistoryAnime v-if="animeList?.length" :anime="animeList as IAddAnime[]" class="col-span-3" />

      <div v-else class="col-span-3 text-white">Тут ничего нет</div>
    </div>
  </div>
</template>

<style scoped></style>
