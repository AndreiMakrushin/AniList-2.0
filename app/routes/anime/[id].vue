<script setup lang="ts">
import AnimePage from '@/pages/anime';

import { useRoute } from 'vue-router';

const route = useRoute()

const id = route.params.id

useHead({
    title: id as string,
})
</script>

<template>
    <AnimePage />
</template>

<style scoped>

</style>