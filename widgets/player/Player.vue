<script setup lang="ts">
import { onMounted, defineProps, ref, watch, computed, onUnmounted } from "vue";
import Hls from "hls.js";
import SelectEpisode from "./widgetsPlayer/SelectEpisode.vue";
import Preview from "./widgetsPlayer/Preview.vue";
import ProgressBar from "./widgetsPlayer/ProgressBar.vue";
import Controllers from "./widgetsPlayer/Controllers.vue";
import type { IAnimePlayer, IUser } from "@/shared/types";
import noImg from "@/shared/assets/image/noAnime.png";
import { useScreenShooter } from "@/shared/helpers/useScreenShooter";
import QualityVideo from "./widgetsPlayer/QualityVideo.vue";

const props = defineProps<{
  user?: IUser;
  episode?: number | undefined;
  animePlay: IAnimePlayer | undefined;
  animeName?: string;
  animeId?: number;
  previewUrl?: string;
  seriaUrl?: string;
}>();

const episodeAnime = ref<number>(props.episode || 1);
const quality = ref<string>("hd");
const timer = ref<number>(0);
const fullscreen = ref<boolean>(false);
const videoElement = ref<HTMLVideoElement | null>(null);
const isPreview = ref<boolean>(false);
const playing = ref<boolean>(false);
const isQualityVideo = ref<boolean>(false);
const showInterface = ref<boolean>(false);

const previewAnime = computed(() => {
  return (
    `${props.previewUrl}${props.animePlay?.list[episodeAnime.value].preview}` ||
    noImg
  );
});

const seria = computed(() => {
  return `${props.seriaUrl}${
    props.animePlay?.list[episodeAnime.value].hls[quality.value]
  }`;
});

const loadPlayer = () => {
  if (!seria.value || !videoElement.value) {
    return;
  }
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(seria.value);
    hls.attachMedia(videoElement.value);
    videoElement.value.currentTime = timer.value;
  } else if (videoElement.value?.canPlayType("application/vnd.apple.mpegurl")) {
    videoElement.value.src = seria.value;
  }
};

function resetParameters() {
  isPreview.value = false;
  playing.value = false;
  timer.value = 0;
  episodeAnime.value = props.episode || 1;
  if (videoElement.value) {
    videoElement.value.currentTime = 0;
  }
}

onMounted(() => {
  loadPlayer();
});
watch([props, episodeAnime, quality], () => {
  loadPlayer();
  resetParameters();
});

const updateEpisode = (event: number) => {
  console.log(event);

  /* emit("updateEpisode", Number(event)); */
};
const playVideo = () => {
  if (isQualityVideo.value) {
    isQualityVideo.value = false;
    return;
  }
  if (!videoElement.value) return;
  isPreview.value = true;
  playing.value = true;
  videoElement.value.play();
};

const videoPaused = () => {
  if (isQualityVideo.value) {
    isQualityVideo.value = false;
    return;
  }
  if (!videoElement.value) return;
  playing.value = false;
  videoElement.value.pause();
  showInterface.value = true;
};
const videoTimer = (time: number) => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);

  if (time >= 3600) {
    const hour = Math.floor(time / 3600);
    return `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
};

const videoTime = computed(() => {
  const time = Math.floor(timer.value);
  return videoTimer(time);
});

const videoDuration = computed(() => {
  if (!videoElement.value) return;
  const time = Math.floor(videoElement.value?.duration);
  return videoTimer(time);
});
const nextEpisode = () => {
  if (episodeAnime.value === props.animePlay?.episodes?.last) {
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
  isQualityVideo.value = !isQualityVideo.value;
};
const updateQuality = (event: string) => {
  quality.value = event;
  isQualityVideo.value = false;
  videoPaused();
};
/* async function addAnimeToHistory() {
  if (props.user === null) return;
  try {
    const { data: existsAnime, error: existsAnimeError } = await supabase
      .from("animeUserList")
      .select()
      .filter("animeId", "eq", props.animeId)
      .filter("episode", "eq", episodeAnime.value)
      .filter("userId", "eq", props.user.id)
      .single();
    if (videoElement.value && existsAnime) {
      videoElement.value.currentTime = existsAnime.current_Time;

      return;
    }
  } catch (error) {
    console.log(error);
  }
  const anime = {
    animeId: props.animeId,
    userId: props.user.id,
    current_Time: timer.value,
    duration_Time: Math.floor(videoElement.value?.duration || 0),
    nameAnime: props.animeName,
    img: props.AnimePlay?.list[episodeAnime.value]?.preview,
    episode: episodeAnime.value,
  };
  addNewAnimeHistory(anime);
} */

const timeUpdate = () => {
  if (!videoElement.value) return;
  timer.value = Math.floor(videoElement.value?.currentTime);
};

/* const realTimeUpdate = () => {
  const date = new Date().toLocaleDateString();
  const normalDate = date.split(".");
  const dateNormal = `${normalDate[2]}-${normalDate[1]}-${normalDate[0]}`;
  const time = new Date().toLocaleTimeString();

  return `${dateNormal} ${time}`;
}; */

/* watch(timer, () => {
  if (props.user === null) return;
  if (timer.value < 1) return;

  updateAnimeHistory(
    props.user.id,
    props.animeId,
    episodeAnime.value,
    timer.value,
    realTimeUpdate()
  );
}); */
let showindTimeout: number | null = null;

const showInterfaceMouse = (event: boolean) => {
  if (showindTimeout !== null) {
    clearTimeout(showindTimeout);
  }
  showInterface.value = true;
  if (event === true) return;
  showindTimeout = window.setTimeout(() => {
    showInterface.value = false;
  }, 5000);
};

const hideInterfaceMouse = () => {
  if (!playing.value) return;
  if (showindTimeout !== null) {
    clearTimeout(showindTimeout);
  }
  showindTimeout = window.setTimeout(() => {
    showInterface.value = false;
  }, 5000);
};

const transitionInterfaceShow = computed(() => {
  return `${
    showInterface.value ? "opacity-1 duration-short" : "opacity-0 duration-short"
  }`;
});

const rewindTheVideo = (e: number) => {
  if (videoElement.value) {
    videoElement.value.currentTime = e;
    timer.value = e;
  }
};
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "Space" && playing.value) {
    videoPaused();
  } else if (event.code === "Space" && !playing.value && isPreview.value) {
    playVideo();
    showInterface.value = false;
  } else if (event.code === "ArrowRight" && videoElement.value) {
    videoElement.value.currentTime += 5;
  } else if (event.code === "ArrowLeft" && videoElement.value) {
    videoElement.value.currentTime -= 5;
  } else if (event.code === "ArrowUp") {
    fullScreen();
    fullscreen.value = true;
  } else if (event.code === "ArrowDown") {
    normalScreen();
    fullscreen.value = false;
  }
};
const fullscreenChange = () => {
  if (document.fullscreenElement) return;
  fullscreen.value = false;
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("fullscreenchange", fullscreenChange);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("fullscreenchange", fullscreenChange);
});
</script>

<template>
  <div
    id="player"
    class="max-w-[700px] h-[100%] relative flex flex-col bg-slate-800 rounded-[10px]"
  >
    <Preview
      v-if="!isPreview"
      :preview-anime="previewAnime ?? noImg"
      @click="playVideo()"
    />

    <!-- addAnimeToHistory() -->

    <video
      v-show="isPreview"
      id="my-video"
      ref="videoElement"
      class="w-full h-full rounded-[10px]"
      :controls="false"
      @mouseenter="showInterfaceMouse(true)"
      @mouseleave="hideInterfaceMouse"
      @timeupdate="timeUpdate"
      @click="playing ? videoPaused() : playVideo()"
    ></video>

    <SelectEpisode
      class="absolute top-2 right-2"
      :episode="props.animePlay?.episodes.last!"
      :selected="episodeAnime"
      @update="updateEpisode($event)"
    />

    <div
      v-if="isPreview"
      :class="transitionInterfaceShow"
      class="absolute bottom-0 w-full flex flex-col text-white px-2 py-1 gap-1 transition-all ease-in-out duration-500"
      @mouseenter="showInterfaceMouse(true)"
      @mouseleave="hideInterfaceMouse"
      @mousemove="showInterfaceMouse(true)"
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
      @mouseenter="showInterfaceMouse(true)"
      @mouseleave="hideInterfaceMouse"
      @mousemove="showInterfaceMouse(true)"
    >
      <QualityVideo
        :quality="quality"
        :anime-quality="props.animePlay?.list[episodeAnime]?.hls || {}"
        @update-quality="updateQuality($event)"
      />
    </div>
  </div>
</template>
