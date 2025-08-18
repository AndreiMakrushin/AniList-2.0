<script setup lang="ts">
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
</script>

<template>
  <div
    class="bg-default font-manropeM bg-fixed bg-cover bg-center bg-no-repeat min-h-screen scroll-smooth"
  >
    <Header />

    <div class="max-w-[1440px] mx-auto">
      <slot />
    </div>

    <Footer />
  </div>
</template>
