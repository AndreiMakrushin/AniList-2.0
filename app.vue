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
  <div>
    <Header />

     <NuxtRouteAnnouncer />

      <NuxtLayout> 
      <NuxtPage /> 
      </NuxtLayout>
  </div>
</template>

