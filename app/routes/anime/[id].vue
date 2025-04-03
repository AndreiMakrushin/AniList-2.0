<script setup lang="ts">
import AnimePage from '@/pages/anime';
import {useAnimeStore} from "@/shared/stores/store"

import { useRoute } from 'vue-router';

const {aniList} = storeToRefs(useAnimeStore())

const route = useRoute()

const id = route.params.id

useHead({
    title: aniList.value?.find(anime => anime.id === Number(id))?.names.ru,
})
</script>

<template>
    <AnimePage />
</template>

<style scoped>

</style>