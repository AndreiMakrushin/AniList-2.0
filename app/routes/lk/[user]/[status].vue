<script setup lang="ts">
import LkPage from "@/pages/lk";

const route = useRoute();
const userId = route.params.user as string;
const status = route.params.status as string;

useHead({
  title: "Личный кабинет",
});
</script>

<template>
  <LkPage :id="userId" :status="status"/>
</template>

<style scoped></style>
