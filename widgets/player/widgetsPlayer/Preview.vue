<script setup lang="ts">
import SvgSprite from "~/shared/ui/sprite-svg/SvgSprite.vue";

interface IPreviewProps {
  previewAnime: string;
};

defineProps<IPreviewProps>();
</script>

<template>
  <div class="w-full">
    <img :src="previewAnime" class="w-full rounded-[10px]" />

    <SvgSprite
      icon="icon-play"
      :width="50"
      :height="50"
      class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white cursor-pointer"
    />
  </div>
</template>
