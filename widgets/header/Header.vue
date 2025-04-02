<script setup lang="ts">
import { useLogout } from '~/shared/composables/useLogout'
import ModalMenu from './components/modal-menu'
import AnimeOnDemand from './components/anime-on-demand/AnimeOnDemand.vue'
import {useSearchAnime} from "~/shared/composables/useSearchAnime"
import type { TAnime } from '~/shared/types'
import { useDebounceFn } from '@vueuse/core'
import { useAnimeStore } from '@/shared/stores/store'


const modalMenu = ref<boolean>(false)
const searchAnime = ref<string>('')
const arrayAnime = ref<TAnime | null>(null)
const store = useAnimeStore()

const debouncedSearch = useDebounceFn(async (query: string) => {
  if (query.length > 3) {
    arrayAnime.value = await useSearchAnime(query)
  } else {
    arrayAnime.value = null
  }
}, 1000)

const goPageAnime = (id: number) => {
    navigateTo(`/anime/${id}`)
  searchAnime.value = ''
}

const goPageLK = () => {
  navigateTo(`/lk/${store.user?.id}/История просмотра`)
}

const userAvatar = computed(() => {
  return store.user?.avatar_url
})
</script>

<template>
    <div class="flex w-[100%] relative">
    <div class="flex flex-col w-full">
      <div class="justify-between items-center flex px-4 py-2 w-full">
        <div class="flex flex-row gap-4 w-[60%]">
          <NuxtLink
            to="/"
            class="text-[20px] font-medium cursor-pointer text-white hover:text-red-500 duration-short"
           
            >AniList</NuxtLink
          >

          <div  class="relative flex flex-row grow gap-5">
            <Search
              v-model:model="searchAnime"
              type="text"
              class="focus:ring-cyan-300 bg-[#d8d8d8]"
              @update:model="debouncedSearch"
            />

            <AnimeOnDemand v-if="arrayAnime" :array-anime="arrayAnime" @go-page-anime="goPageAnime($event)"/>
          </div>
        </div>

        <main class="flex flex-row items-center gap-5">
          <!-- <Switch /> -->

          <Avatar
            v-if="userAvatar"
            class-avatar="w-[32px] h-[32px]"
            :img="userAvatar"
            @click="modalMenu = !modalMenu"
          />

          <Button
            v-if="!userAvatar"
            label="Войти"
            class-btn="p-0 font-medium text-gray-500"
          />
            
        </main>
      </div>
    </div>

    <ModalMenu v-if="modalMenu" class="right-[20px] top-[100%] text-[14px]" @click="modalMenu = false">

      <Button icon="icon-user" :width="20" :height="20" :label="store.user?.name!"/>

      <Button icon="icon-settings" :width="20" :height="20" label="Мой Профиль" @click="goPageLK"/>

      <Button icon="exit" :width="20" :height="20" label="Выйти" @click="useLogout"/>
    </ModalMenu>
  </div>
</template>

<style scoped>

</style>