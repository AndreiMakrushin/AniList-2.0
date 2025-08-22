<script setup lang="ts">
import HistoryAnime from "./history-anime/HistoryAnime.vue";
import StatusAnime from "./status-anime/StatusAnime.vue";
import { registrationPeriod } from "~/shared/helpers/registrationPeriod";
import { animeStatus } from "~/shared/helpers/animeStatuses";
import { useLKPage } from "../composables/useLKPage";

const props = defineProps<{
  id: string;
  statusCode: string;
}>();

const { user, animeList, isLoading, deleteAvatar, getAnime } = useLKPage();

onMounted(() => {
  getAnime(props.statusCode, props.id);
});
</script>

<template>
  <div class="p-5 w-[80%] max-pads:w-full mx-auto">
    <div class="block bg-white shadow-shadowDrop rounded-[15px] p-5 mb-5">
      <div
        class="flex flex-row gap-10 max-pads:gap-5 max-pads:flex-col max-pads:items-center"
      >
        <Avatar
          :img="user?.avatar_url"
          class="max-h-[140px] aspect-square"
          @click="deleteAvatar(user!.id)"
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
        class="bg-white sticky z-50 top-24 shadow-shadowDrop rounded-[15px] h-fit p-5 flex flex-col overflow-x-auto gap-3 max-pads:flex max-pads:flex-row max-pads:gap-3"
      >
        <NuxtLink
          v-for="status in animeStatus"
          :key="status.id"
          :to="`/lk/${id}/${status.id}`"
          :class="[
            'px-3 py-2 rounded-lg transition-all text-nowrap duration-200 truncate max-pads:whitespace-nowrap max-pads:overflow-visible max-pads:text-clip cursor-pointer',
            statusCode === status.id
              ? 'bg-[#f5f0ff] text-[#7e22ce] font-medium border-none'
              : 'text-[#6b7280] hover:bg-[#f8f5ff]',
          ]"
        >
          {{ status.statusRu }}
        </NuxtLink>
      </div>

      <div v-if="isLoading" class="col-span-3 text-white">Загрузка...</div>

      <HistoryAnime v-if="statusCode === 'history'" :anime="animeList as IAddAnime[]" />

      <StatusAnime
        v-else-if="statusCode !== 'history' && animeList?.length"
        :anime="animeList as IAnimeStatus[]"
      />

      <div v-else-if="!isLoading" class="col-span-3 text-white">Тут ничего нет</div>
    </div>
  </div>
</template>
