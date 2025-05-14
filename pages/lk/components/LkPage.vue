<script setup lang="ts">
import { useSupabaseAuth } from "@/shared/helpers/useSupabaseAuth";
import { useSupabaseAnime } from "@/shared/helpers/useSupabaseAnime";
import type { IAddAnime } from "@/shared/types";

const props = defineProps<{
  id: string;
}>();
const { deleteUserAvatar } = useSupabaseAuth();
const { getAnimeToHistory } = useSupabaseAnime();

const animeHistoryList = ref<IAddAnime[] | null>(null);

const animeStatus = [
  {
    id: 1,
    statusRu: "История просмотра",
    statusEn: "Watching history",
  },
  {
    id: 2,
    statusRu: "Смотрю",
    statusEn: "Watching",
  },
  {
    id: 3,
    statusRu: "Просмотрено",
    statusEn: "Watched",
  },
  {
    id: 4,
    statusRu: "Запланировано",
    status: "Planned",
  },
  {
    id: 5,
    statusRu: "Пересматриваю",
    statusEn: "Rereading",
  },
  {
    id: 6,
    statusRu: "Выходит",
    statusEn: "Upcoming",
  },
  {
    id: 7,
    statusRu: "Заброшено",
    statusEn: "Abandoned",
  },
];

const deleteAvatar = async () => {
  await deleteUserAvatar(props.id);
};

onMounted(async () => {
  const data = await getAnimeToHistory(props.id);
  if (data) {
    animeHistoryList.value = data;
  }
});
</script>

<template>
  <div class="px-5">
    {{ id }}

    <CardAnimeHistory :anime="animeHistoryList" />
  </div>
</template>

<style scoped></style>
