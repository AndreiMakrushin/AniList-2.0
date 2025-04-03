<script setup lang="ts">
/* import { useAuth } from "@/shared/composables/useAuth"
import {useRegister} from "@/shared/composables/useRegister" */
import { useGetAnimeList } from "@/shared/composables/useGetAnimeList";
import { useAnimeStore } from "@/shared/stores/store";
import { addUniqueAnime } from "~/shared/helpers/addUniqueAnime";
import CardList from "~/shared/components/card-list/CardList.vue";

const { aniList, page } = storeToRefs(useAnimeStore());

/* const user = {
  email: 'andrei18makrushin@gmail.com',
  password: '12Apple2'
}

const register = {
  name: 'Андрей',
  email: 'andrei18maffkrushin@gmail.com',
  password: '12Apple2'
}

const handleLogin = async () => {
  const result = await useAuth(user)
  
  if (result.error) {

    console.log('Auth failed:', result.error.message)
  } else {
    console.log('Logged in user:', result.data)
  }
} */

/* const handleRegister = async () => {
  const result = await useRegister(register)

  if (result.error) {

    console.log('Register failed:', result.error.message)
  }else{
    console.log('Registered user:', result.data)
  }
} */

const isLoading = ref(false);

const fetchAndAddAnime = async () => {
  isLoading.value = true;
  try {
    const result = await useGetAnimeList(page.value);
    aniList.value = addUniqueAnime(result, aniList.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (aniList.value) return;
  await fetchAndAddAnime();
});

const loadMore = async () => {
  page.value++;
  await fetchAndAddAnime();
};
</script>

<template>
  <div class="flex flex-col items-center pb-5 gap-3">
    <div
      v-if="aniList"
      class="grid gap-[30px] p-[20px] 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
    >
      <CardList :anime="aniList" />
    </div>

    <Spinner v-if="isLoading && aniList" />

    <img v-if="!aniList && !isLoading" src="@/shared/assets/image/noAnime.png" class="rounded-lg" />

    <Button
      v-if="aniList && !isLoading"
      label="Load more"
      class="text-white text-base !w-fit !p-3 cursor-pointer"
      @click="loadMore"
    />
  </div>
</template>

<style scoped></style>
