<script setup lang="ts">
import { useGetUser } from "~/shared/composables/useGetUser";

onMounted(async () => {
  await useGetUser();
});
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
