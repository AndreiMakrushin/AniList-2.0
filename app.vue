<script setup lang="ts">
import { useAnimeStore } from "@/shared/stores/store";
import { useGetUserSession } from "@/shared/composables/useGetUserSession";

const store = useAnimeStore();

onMounted(async () => {
  const result = await useGetUserSession();
  store.user = result.data;
});
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


