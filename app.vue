<script setup lang="ts">
import Header from './widgets/header'
import {useAnimeStore} from '@/shared/stores/store'
import { useGetUserSession } from '@/shared/composables/useGetUserSession'

const store = useAnimeStore()

onMounted(async() => {
  const result = await useGetUserSession()
  store.user = result.data
})
</script>

<template>
  <div class="image">
    <Header />

     <NuxtRouteAnnouncer />

      <NuxtLayout> 
      <NuxtPage /> 
      </NuxtLayout>
  </div>
</template>

<style scoped>
.image {
  background-image: url('./shared/public/images/bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
