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
    if (imgRef.value.complete) {
      isImageLoaded.value = true;
      return;
    }

    imgRef.value.onload = () => {
      isImageLoaded.value = true;
    };
    imgRef.value.onerror = () => {
      isImageLoaded.value = false;
    };
  }
});
</script>

<template>
  <article class="flex flex-col items-center gap-3 cursor-pointer w-full" :class="{ 'pointer-events-none': !isImageLoaded }">
    <div class="relative w-full aspect-[3/4.248] rounded-[15px] overflow-hidden">
      <div
        v-if="!isImageLoaded"
        class="absolute inset-0 bg-gray-200 dark:bg-gray-700 before:absolute before:inset-0 before:bg-[length:200%_100%] before:bg-gradient-to-r before:from-gray-200 before:via-gray-300 before:to-gray-200 dark:before:from-gray-700 dark:before:via-gray-600 dark:before:to-gray-700 before:animate-shimmer z-0"
      ></div>

      <img
        v-if="anime?.poster"
        ref="imgRef"
        :src="`https://dl-20240330-7.anilib.moe${anime.poster}`"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      />

      <div
        v-if="anime?.description"
        class="flex scrollbar max-mobile:hidden flex-col gap-3 absolute z-20 top-0 p-4 overflow-y-auto left-0 w-full h-full hover:bg-cardOpacity hover:text-white duration-300 text-transparent"
      >
        <span>{{ anime.description }}</span>

        <span>Дата выхода: {{ anime.season.string }} - {{ anime.season.year }}</span>
      </div>
    </div>

    <div class="flex flex-col items-center w-full min-h-6">
      <div
        v-if="!anime?.names?.ru && !anime?.names?.en"
        class="w-full h-6 rounded-[15px] bg-gray-200 dark:bg-gray-700"
      ></div>

      <h2
        v-else
        class="font-medium w-full text-white whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ anime?.names.ru ?? anime?.names.en }}
      </h2>
    </div>
  </article>
</template>
