<script setup lang="ts">
import type { IAnimeStatus } from "@/shared/types";
const props = defineProps<{ anime: IAnimeStatus[] | null }>();

const sortedAnimeByUpdate = computed(() => {
  return props.anime
    ?.filter((item: IAnimeStatus) => item.created_at !== null)
    .sort((a: IAnimeStatus, b: IAnimeStatus) => {
      const dateA = new Date(a.created_at!);
      const dateB = new Date(b.created_at!);
      return dateB.getTime() - dateA.getTime();
    });
});
</script>

<template>
  <div
    class="col-span-3 text-black grid grid-cols-3 max-pads:grid-cols-2 gap-5 max-mobile:grid-cols-1"
  >
    <StatusAnimeCard
      v-for="item in sortedAnimeByUpdate"
      :key="item.animeId"
      :anime="item"
    />
  </div>
</template>

<style scoped></style>
