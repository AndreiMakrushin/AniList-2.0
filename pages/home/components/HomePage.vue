<script setup lang="ts">
import { useGetAnimeList } from "@/shared/composables/useGetAnimeList";
import { useAnimeStore } from "@/shared/stores/store";
import { addUniqueAnime } from "~/shared/helpers/addUniqueAnime";
import AnimeCard from "~/shared/ui/card-anime";
import AnimeGrid from "@/shared/components/anime-grid";

const { aniList, page } = storeToRefs(useAnimeStore());

const isLoading = ref(false);

const fetchAndAddAnime = async () => {
  isLoading.value = true;
  try {
    const result = await useGetAnimeList(page.value);
    aniList.value = addUniqueAnime(result, aniList.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (aniList.value) return;
  await fetchAndAddAnime();
});

const loadMore = async () => {
  page.value++;
  await fetchAndAddAnime();
};

const goPageAnime = (code: string) => {
  navigateTo(`/anime/${code}`);
};
</script>

<template>
  <div class="flex flex-col items-center pb-5 gap-3">
    <AnimeGrid v-if="aniList">
      <AnimeCard
        v-for="(animeCard, index) in aniList"
        :key="animeCard.id"
        :anime="animeCard"
        :style="{ 'transition-delay': `${index * 0.1}s` }"
        @click="goPageAnime(animeCard.code)"
      ></AnimeCard>
    </AnimeGrid>

    <AnimeGrid v-else-if="isLoading"><AnimeGridSkeleton v-for="i in 10" :key="i" /> </AnimeGrid>

    <Spinner v-if="!aniList && isLoading" />

    <div class="flex w-full h-full items-center justify-center">
      <img
        v-if="!aniList && !isLoading"
        src="@/shared/assets/image/noAnime.png"
        class="rounded-lg"
      />
    </div>

    <Button
      v-if="aniList && !isLoading"
      label="Load more"
      class="text-white text-base !w-fit !p-3 cursor-pointer"
      @click="loadMore"
    />
  </div>
</template>
