<script setup lang="ts">
import type { TAnime } from "@/shared/types";
const route = useRoute();

const codeAnime = route.params.id;

const anime = ref<TAnime | null>(null);

const getAnimeForCode = async () => {
  const config = useRuntimeConfig();
  const list = config.public.animeSingle;

  try {
    const response = await fetch(`${list}${codeAnime}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return (anime.value = data);
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  await getAnimeForCode();
});
</script>

<template>
  <div>{{ anime }}</div>
</template>

<style scoped></style>
