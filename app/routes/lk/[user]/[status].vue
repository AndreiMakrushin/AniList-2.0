<script setup lang="ts">
import LkPage from "@/pages/lk";
import { animeStatus } from "~/shared/helpers/animeStatuses";

const route = useRoute();
const userId = route.params.user as string;
const statusCode = route.params.status as string;

useHead({
  title: animeStatus.find((status) => status.id === statusCode)?.statusRu,
});
</script>

<template>
  <LkPage :id="userId" :status-code="statusCode"/>
</template>

<style scoped></style>
