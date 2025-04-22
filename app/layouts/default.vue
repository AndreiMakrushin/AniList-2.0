<script setup lang="ts">
import Header from "@/widgets/header";
</script>

<template>
  <div class="app-layout">
    <Header />

    <div class="max-w-[1440px] mx-auto"><slot /></div>
  </div>
</template>

<style scoped>
.app-layout {
  background-image: url("@/shared/public/images/bg.jpg");
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
