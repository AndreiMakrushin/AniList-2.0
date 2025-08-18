<script setup lang="ts">
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
</script>

<template>
  <div class="bg-default font-manropeM bg-fixed bg-cover bg-center bg-no-repeat">
    <div class="flex flex-col min-h-screen">
      <Header />

      <main class="flex-1 max-w-[1440px] w-full mx-auto">
        <slot />
      </main>

      <Footer />
    </div>
  </div>
</template>
