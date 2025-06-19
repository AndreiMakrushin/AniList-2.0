<script setup lang="ts">
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
</script>

<template>
  <div class="app-layout font-manropeM">
    <Header />

    <div class="max-w-[1440px] mx-auto"><slot /></div>

    <Footer />
  </div>
</template>

<style scoped>
.app-layout {
  background-image: url("@/shared/public/images/bg.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  scroll-behavior: smooth;
}
</style>
