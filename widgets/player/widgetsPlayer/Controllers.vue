<script setup lang="ts">
import SvgSprite from "~/shared/ui/sprite-svg/SvgSprite.vue";
const emit = defineEmits<{
  (
    e:
      | "prevEpisode"
      | "nextEpisode"
      | "playVideo"
      | "videoPaused"
      | "screenShot"
      | "openSelectQuality"
      | "fullScreen"
      | "normalScreen"
  ): void;
}>();

defineProps<{
  playing?: boolean;
  videoTime?: string;
  videoDuration?: string;
  fullscreen?: boolean;
}>();
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-row gap-2 items-center">
      <SvgSprite
        class="cursor-pointer"
        icon="icon-prev"
        @click.stop="emit('prevEpisode')"
      />

      <SvgSprite
        v-if="playing"
        class="cursor-pointer"
        icon="icon-pause"
        @click.stop="emit('videoPaused')"
      />

      <SvgSprite
        v-if="!playing"
        class="cursor-pointer"
        icon="icon-play-small"
        @click.stop="emit('playVideo')"
      />

      <SvgSprite
        class="cursor-pointer"
        icon="icon-next"
        @click.stop="emit('nextEpisode')"
      />

      <p>
        {{ videoTime }}
        / {{ videoDuration }}
      </p>

      <SvgSprite
        icon="icon-screenShot"
        class="cursor-pointer"
        @click.stop="emit('screenShot')"
      />
    </div>

    <div class="flex flex-row gap-3">
      <SvgSprite
        icon="icon-settings"
        class="hover:rotate-[60deg] duration-short cursor-pointer"
        @click.stop="emit('openSelectQuality')"
      />

      <SvgSprite
        v-if="!fullscreen"
        icon="icon-fullScreen"
        class="hover:scale-110 duration-short cursor-pointer"
        @click="emit('fullScreen')"
      />

      <SvgSprite
        v-else
        icon="icon-smallScreen"
        class="hover:scale-20 duration-short cursor-pointer"
        @click="emit('normalScreen')"
      />
    </div>
  </div>
</template>
