<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="w-full relative bottom-0 z-10 rounded-t-xl overflow-hidden text-white bg-gradient-to-r from-gray-900/80 to-indigo-900/80"
  >
    <div class="absolute inset-0 backdrop-blur-lg z-0"></div>

    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-0"></div>

    <div
      class="max-w-7xl relative flex flex-row max-mobile:flex-col gap-5 z-20 p-6 items-center justify-start border-t border-gray-800/50 text-center text-gray-400 text-sm"
    >
      <img
        src="@/shared/public/favicon.svg"
        class="w-12 aspect-square object-cover transition-transform hover:scale-110"
        alt="AniList Logo"
      />

      <p>© {{ currentYear }} AniList.</p>

      <span
        >Api для аниме используется
        <a class="text-red-300" href="https://anilibria.wtf/" target="_blank">anilibria.wtf</a></span
      >
    </div>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0 -10px 30px rgba(79, 70, 229, 0.1);
}
</style>
