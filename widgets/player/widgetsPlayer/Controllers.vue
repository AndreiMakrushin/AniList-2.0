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
  videoTime: string;
  videoDuration: string;
  fullscreen?: boolean;
}>();
</script>

<template>
  <div class="flex flex-row items-center justify-between py-1">
    <div class="flex flex-row gap-2 items-center">
      <SvgSprite
        class="cursor-pointer"
        icon="icon-prev"
        :width="20"
        :height="20"
        @click.stop="emit('prevEpisode')"
      />

      <SvgSprite
        v-if="playing"
        class="cursor-pointer"
        icon="icon-pause"
        :width="20"
        :height="20"
        @click.stop="emit('videoPaused')"
      />

      <SvgSprite
        v-if="!playing"
        class="cursor-pointer"
        icon="icon-play-small"
        :width="20"
        :height="20"
        @click.stop="emit('playVideo')"
      />

      <SvgSprite
        class="cursor-pointer"
        icon="icon-next"
        :width="20"
        :height="20"
        @click.stop="emit('nextEpisode')"
      />

      <p>
        {{ videoTime }}
        / {{ videoDuration }}
      </p>

      <SvgSprite
        icon="icon-screenShot"
        :width="20"
        :height="20"
        class="cursor-pointer"
        @click.stop="emit('screenShot')"
      />
    </div>

    <div class="flex flex-row gap-3">
      <SvgSprite
        icon="icon-settings"
        :width="20"
        :height="20"
        class="hover:rotate-[60deg] duration-short cursor-pointer"
        @click.stop="emit('openSelectQuality')"
      />

      <SvgSprite
        v-if="!fullscreen"
        icon="icon-fullScreen"
        :width="20"
        :height="20"
        class="hover:scale-110 duration-short cursor-pointer"
        @click="emit('fullScreen')"
      />

      <SvgSprite
        v-else
        icon="icon-smallScreen"
        :width="20"
        :height="20"
        class="hover:scale-20 duration-short cursor-pointer"
        @click="emit('normalScreen')"
      />
    </div>
  </div>
</template>
