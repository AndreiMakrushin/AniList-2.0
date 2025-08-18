<script setup lang="ts">
import { NotFoundPage } from "@/pages/not-found";

useHead({
  title: "404",
});

definePageMeta({
  layout: "simple",
});
</script>

<template>
  <NotFoundPage />
</template>
