<script setup lang="ts">
import AnimePage from "@/pages/anime";

const config = useRuntimeConfig();
const singleAnime = config.public.ANIME_SINGLE;
const route = useRoute();
const code = route.params.id;

const { data: anime } = await useAsyncData(`anime-${code}`, async () => {
  try {
    const response = await fetch(`${singleAnime}${code}`);
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return null;
  }
});

useHead({
  title: anime.value?.names?.ru || "Аниме",
});
</script>

<template>
  <AnimePage />
</template>

<style scoped></style>
