<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { IAnimeCard } from "@/shared/types";

const props = defineProps<{
  anime: IAnimeCard | undefined;
}>();

const isImageLoaded = ref(false);
const imgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (imgRef.value && props.anime?.poster) {
    imgRef.value.onload = () => {
      isImageLoaded.value = true;
    };
    imgRef.value.onerror = () => {
      isImageLoaded.value = false;
    };
    if (imgRef.value.complete) {
      isImageLoaded.value = true;
    }
  }
});
</script>

<template>
  <article class="flex flex-col items-center gap-3 cursor-pointer">
    <div class="relative z-0 h-full rounded-[15px] w-full">
      <div
        v-show="!isImageLoaded || !anime?.poster"
        class="w-full h-[90%] rounded-[15px] bg-gray-200 dark:bg-gray-700 relative overflow-hidden before:absolute before:inset-0 before:w-full before:h-full before:bg-[length:200%_100%] before:bg-gradient-to-r before:from-gray-200 before:via-gray-300 before:to-gray-200 dark:before:from-gray-700 dark:before:via-gray-600 dark:before:to-gray-700 before:animate-shimmer aspect-[3/4.248]"
      ></div>

      <img
        v-if="anime?.poster"
        ref="imgRef"
        :src="`https://dl-20240330-7.anilib.moe${anime.poster}`"
        class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-0': !isImageLoaded }"
      />

      <div
        v-if="isImageLoaded && anime?.description"
        class="flex scrollbar max-mobile:hidden flex-col gap-3 absolute z-10 top-0 p-4 overflow-y-auto left-0 w-full h-full hover:bg-cardOpacity hover:text-white duration-300 text-transparent"
      >
        <span>{{ anime.description }}</span>
        Дата выхода: {{ anime.season.string }} - {{ anime.season.year }}
      </div>

      <div
        v-if="!isImageLoaded || !anime?.description"
        class="absolute bottom-0 w-full h-6 rounded-[15px] bg-gray-200 dark:bg-gray-700"
      ></div>
    </div>

    <div class="flex flex-col items-center w-full">
      <h2
        class="font-medium w-full text-white duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ anime?.names.ru || "" }}
      </h2>
    </div>
  </article>
</template>
