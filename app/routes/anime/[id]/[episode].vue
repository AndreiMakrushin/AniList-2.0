<script setup lang="ts">
import type { TAnime } from "@/shared/types";
import AnimePage from "@/pages/anime";

const config = useRuntimeConfig();
const api = config.public.ANILIBRIA_API;
const singleAnime = config.public.ANIME_SINGLE;
const route = useRoute();
const id = route.params.id;
const episode = route.params.episode as string;



const { data: anime } = await useAsyncData(`anime-${id}`, async (): Promise<TAnime> => {
  const result = await $fetch<TAnime>(`${api}${singleAnime}${id}`)
  return result;
});

useHead({
  title: anime.value?.name.main || "Аниме",
});
</script>

<template>
  <AnimePage :anime="anime" :episode="episode"/>
</template>

<style scoped></style>
