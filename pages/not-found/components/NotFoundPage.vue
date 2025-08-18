<script setup lang="ts">
import { ref } from "vue";

const particles = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }))
);
</script>

<template>
  <div
    class="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <!-- Анимированные частицы фона -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="absolute rounded-full bg-indigo-500/10 animate-float"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        animationDelay: `${particle.delay}s`,
      }"
    />

    <div class="relative z-10 flex flex-col items-center text-center p-6">
      <div class="text-8xl md:text-9xl font-bold text-indigo-600 animate-pulse">404</div>

      <h1 class="text-2xl md:text-3xl font-medium mt-4 text-gray-800">
        Упс! Страница потерялась в космосе
      </h1>

      <p class="mt-2 text-gray-500 max-w-md text-center">
        Похоже, мы не можем найти то, что вы ищете. Возможно, страница была перемещена или
        удалена.
      </p>

      <div class="mt-8 flex gap-4 flex-wrap justify-center">
        <RouterLink
          to="/"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          На главную
        </RouterLink>

        <button
          class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          @click="$router.go(-1)"
        >
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>
