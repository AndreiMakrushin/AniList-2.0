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

      <div class="flex flex-1"><NuxtLayout> 
      <NuxtPage /> 
      </NuxtLayout></div>
  </div>
</template>

<style scoped>
.image {
  background-image: url('./shared/public/images/bg.jpg');
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow-y: scroll;
}
</style>
