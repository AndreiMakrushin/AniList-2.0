<script setup lang="ts">
import Hls from "hls.js";
import SelectEpisode from "./widgetsPlayer/SelectEpisode.vue";
import Preview from "./widgetsPlayer/Preview.vue";
import ProgressBar from "./widgetsPlayer/progress-bar/ProgressBar.vue";
import Controllers from "./widgetsPlayer/Controllers.vue";
import type { IEpisode, IAddAnimeToHistory, IRealTimeUpdate } from "@/shared/types";
import noImg from "@/shared/assets/image/noAnime.png";
import { useScreenShooter } from "~/shared/composables/useScreenShooter";
import QualityVideo from "./widgetsPlayer/QualityVideo.vue";
import { videoTimer } from "./helpers/video-timer";

const emit = defineEmits<{
  (e: "addHistory", payload: IAddAnimeToHistory): void;
  (e: "realTimeUpdate", event: IRealTimeUpdate): void;
}>();

const props = defineProps<{
  updateHistory: boolean;
  episode?: number | undefined;
  animePlay: IEpisode[] | undefined;
  animeName?: string;
  animeCode: string;
  animeId: number;
  previewUrl: string;
}>();

const episodeAnime = ref<number>(props.episode!);
const quality = ref<string>("hls_720");
const timer = ref<number>(0);
const fullscreen = ref<boolean>(false);
const videoElement = ref<HTMLVideoElement | null>(null);
const isPreview = ref<boolean>(false);
const playing = ref<boolean>(false);
const isQualityVideo = ref<boolean>(false);
const controllers = ref(false);
const hlsInstance = ref<Hls | null>(null);

let timeout: ReturnType<typeof setTimeout>;

const previewAnime = computed(() => {
  const preview = props.animePlay![episodeAnime.value]?.preview.src;
  return preview ? `${props.previewUrl}${preview}` : noImg;
});

const episode = computed(() => {
  const hlsSource = props.animePlay![episodeAnime.value]?.hls_720;

  return hlsSource ? `${hlsSource}` : "";
});

const loadPlayer = () => {
  if (!episode.value || !videoElement.value) {
    return;
  }
  if (hlsInstance.value) {
    hlsInstance.value.destroy();
  }
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(episode.value);
    hls.attachMedia(videoElement.value);
    videoElement.value.currentTime = timer.value;
    hlsInstance.value = hls;
  } else if (videoElement.value?.canPlayType("application/vnd.apple.mpegurl")) {
    videoElement.value.src = episode.value;
  }
};

function resetParameters() {
  isPreview.value = false;
  playing.value = false;

  if (videoElement.value) {
    timer.value = 0;
    videoElement.value.currentTime = 0;
  }
}
watch([props, episodeAnime, quality], () => {
  loadPlayer();
  resetParameters();
});

const updateEpisode = (event: number) => {
  resetParameters();
  episodeAnime.value = event;
};

const recordAnimeToHistory = () => {
  if (props.updateHistory) {
    emit("addHistory", {
      videoElement: videoElement.value,
      animeId: props.animeId,
      animeName: props.animeName!,
      animePoster: previewAnime.value!,
      episodeAnime: episodeAnime.value,
      code: props.animeCode,
    });
  }
};
const playVideo = async () => {
  if (!videoElement.value) return;

  isPreview.value = true;
  playing.value = true;
  try {
    await videoElement.value.play();
    videoElement.value.play();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      controllers.value = false;
    }, 5000);
  } catch (error) {
    isQualityVideo.value = true;
  }
};

const videoPaused = () => {
  if (!videoElement.value) return;
  playing.value = false;
  controllers.value = true;
  videoElement.value.pause();
};

const videoTime = computed(() => {
  const time = Math.floor(timer.value);
  return videoTimer(time);
});

const videoDuration = computed(() => {
  if (!videoElement.value?.duration) return "00:00";
  const time = Math.floor(videoElement.value?.duration);
  return videoTimer(time);
});
const nextEpisode = () => {
  if (episodeAnime.value === props.animePlay!.length) {
    episodeAnime.value = 0;
  }
  episodeAnime.value++;
  resetParameters();
};
const prevEpisode = () => {
  if (episodeAnime.value === 1) return;
  episodeAnime.value--;
  resetParameters();
};
const fullScreen = () => {
  if (!videoElement.value) return;
  const player = document.getElementById("player") as HTMLVideoElement | null;
  if (!player) return;
  player
    .requestFullscreen()
    .then(() => {
      fullscreen.value = true;
    })
    .catch((err: Error) => {
      return err;
    });
};
const normalScreen = () => {
  if (!videoElement.value) return;
  if (!fullscreen.value) return;
  document.exitFullscreen();
  fullscreen.value = false;
};

const openSelectQuality = () => {
  console.log(isQualityVideo.value);
  isQualityVideo.value = !isQualityVideo.value;
};
const updateQuality = (event: string) => {
  quality.value = event;
  isQualityVideo.value = false;
  videoPaused();
};

const realTimeUpdate = () => {
  const date = new Date().toLocaleDateString();
  const normalDate = date.split(".");
  const dateNormal = `${normalDate[2]}-${normalDate[1]}-${normalDate[0]}`;
  const time = new Date().toLocaleTimeString();

  return `${dateNormal} ${time}`;
};

const timeUpdate = () => {
  if (!videoElement.value) return;
  timer.value = Math.floor(videoElement.value?.currentTime);
};

watch(timer, () => {
  if (!props.updateHistory) return;
  if (timer.value < 1) return;
  emit("realTimeUpdate", {
    animeId: props.animeId,
    episodeAnime: episodeAnime.value,
    timer: timer.value,
    realTimeUpdate: realTimeUpdate(),
  });
});

const showControllers = () => {
  if (!playing.value) return;
  controllers.value = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (!playing.value) return;
    controllers.value = false;
  }, 5000);
};
const hideControllers = () => {
  if (!playing.value) return;
  controllers.value = false;
};

const rewindTheVideo = (e: number) => {
  if (videoElement.value) {
    videoElement.value.currentTime = e;
    timer.value = e;
  }
};
const toggleFullscreen = () => {
  if (fullscreen.value) {
    normalScreen();
  } else {
    fullScreen();
  }
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (!videoElement.value) return;

  switch (event.code) {
    case "Space":
      playing.value ? videoPaused() : playVideo();
      break;
    case "ArrowRight":
      videoElement.value.currentTime += 5;
      break;
    case "ArrowLeft":
      videoElement.value.currentTime -= 5;
      break;
    case "ArrowUp":
    case "ArrowDown":
      toggleFullscreen();
      break;
  }
};
const fullscreenChange = () => {
  if (document.fullscreenElement) return;
  fullscreen.value = false;
};

onMounted(() => {
  loadPlayer();
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("fullscreenchange", fullscreenChange);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("fullscreenchange", fullscreenChange);
  if (hlsInstance.value) {
    hlsInstance.value?.off(Hls.Events.ERROR);
    hlsInstance.value?.destroy();
  }
  clearTimeout(timeout);
});

const animeQuality = computed(() => {
  return Object.entries(props.animePlay![episodeAnime.value] ?? {})
    .filter(([key, value]) => key.startsWith("hls_") && value)
    .map(([key, _]) => key.replace("hls_", "") + "p",
    )
    .sort((a, b) => {
      return a.localeCompare(b) - b.localeCompare(a);
    });
});
</script>

<template>
  <div
    id="player"
    class="max-w-[700px] h-[100%] relative overflow-hidden flex flex-col bg-slate-800 rounded-[10px]"
    @mouseenter="showControllers"
    @mouseleave="hideControllers"
    @mousemove="showControllers"
  >
    <Preview
      v-if="!isPreview"
      :preview-anime="previewAnime ?? noImg"
      @click="[playVideo(), recordAnimeToHistory()]"
    />

    <!-- addAnimeToHistory() -->

    <video
      v-show="isPreview"
      id="my-video"
      ref="videoElement"
      class="w-full h-full rounded-[10px]"
      :controls="false"
      @timeupdate="timeUpdate"
      @click="playing ? videoPaused() : playVideo()"
    ></video>

    <SelectEpisode
      :class="controllers ? 'top-2' : '-top-20'"
      class="absolute duration-500 ease-in-out transition-all right-2"
      :episode="props.animePlay!.length ?? 1"
      :selected="episodeAnime"
      @update="updateEpisode($event)"
    />

    <div
      v-if="isPreview"
      :class="controllers ? 'bottom-0' : '-bottom-20'"
      class="absolute w-full flex flex-col text-white px-2 py-1 gap-1 transition-all ease-in-out duration-500"
    >
      <ProgressBar
        :video-current-time="videoElement?.currentTime"
        :video-duration-time="videoElement?.duration"
        @rewind="rewindTheVideo($event)"
      />

      <Controllers
        :fullscreen="fullscreen"
        :playing="playing"
        :video-time="videoTime"
        :video-duration="videoDuration"
        @prev-episode="prevEpisode"
        @next-episode="nextEpisode"
        @play-video="playVideo"
        @video-paused="videoPaused"
        @screen-shot="
          useScreenShooter(
            videoElement,
            videoElement!.videoWidth,
            videoElement!.videoHeight
          )
        "
        @open-select-quality="openSelectQuality"
        @full-screen="fullScreen"
        @normal-screen="normalScreen"
      />
    </div>

    <div
      v-if="isQualityVideo"
      class="absolute text-white bottom-10 right-5 bg-gray-500 rounded-[10px] overflow-hidden"
    >
      <QualityVideo
        :quality="quality"
        :anime-quality="animeQuality"
        @update-quality="updateQuality($event)"
      />
    </div>
  </div>
</template>
