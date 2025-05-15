<script setup lang="ts">
import { useSupabaseAuth } from "@/shared/helpers/useSupabaseAuth";
import { useSupabaseAnime } from "@/shared/helpers/useSupabaseAnime";
import type { IAddAnime } from "@/shared/types";
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
const { getAnimeToHistory } = useSupabaseAnime();

const animeHistoryList = ref<IAddAnime[] | null>(null);

const deleteAvatar = async () => {
  await deleteUserAvatar(props.id);
};

onMounted(async () => {
  const data = await getAnimeToHistory(props.id);
  if (data) {
    animeHistoryList.value = data;
  }
});
</script>

<template>
  <div class="p-5">
    <div class="block bg-white shadow-shadowDrop rounded-[15px] p-3 mb-5">
      <div class="flex flex-row gap-10 max-pads:gap-5 max-pads:flex-col max-pads:items-center">
        <Avatar
          :img="user?.avatar_url"
          class="max-h-[150px] aspect-square"
          @click="deleteAvatar"
        />

        <div class="flex flex-col gap-2">
          <span>{{ user?.name }}</span>

          <span class="rounded-full text-[#9d174d] bg-[#ffebee] px-3 py-1"
            >Ты с нами уже: {{ registrationPeriod(user?.created_at!) }}</span
          >
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5 max-pads:flex max-pads:flex-col">
      <div
        class="bg-white shadow-shadowDrop rounded-[15px] h-fit p-3 mb-5 flex flex-col overflow-scroll gap-3 max-pads:flex max-pads:flex-row max-pads:gap-3"
      >
        <span
          v-for="status in animeStatus"
          :key="status.id"
          :class="[
            'px-3 py-2 rounded-lg transition-all text-nowrap duration-200 cursor-pointer',
            +statusCode === status.id
              ? 'bg-[#f5f0ff] text-[#7e22ce] font-medium border-none'
              : 'text-[#6b7280] hover:bg-[#f8f5ff]',
          ]"
        >
          {{ status.statusRu }}
        </span>
      </div>

      <HistoryAnime :anime="animeHistoryList" class="col-span-2" />
    </div>
  </div>
</template>

<style scoped></style>
