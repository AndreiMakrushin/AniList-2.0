<script setup lang="ts">
import { useLogout } from "~/shared/composables/useLogout";
import MenuLayout from "~/shared/components/layouts/menu-layout";
import AnimeBySearch from "./widgets/anime-by-search";
import Avatar from "~/shared/ui/avatar/Avatar.vue";
import { useAnimeStore } from "@/shared/stores/store";
import PopperMenu from "@/shared/ui/poppers/popper-menu/PopperMenu.vue";

const { user } = storeToRefs(useAnimeStore());

const goPageLK = () => {
  navigateTo(`/lk/${user.value!.id}/history`);
};

const userAvatar = computed(() => {
  return user.value?.avatar_url;
});

const logout = async () => {
  await useLogout();
  user.value = null;
};
</script>

<template>
  <div class="flex w-[100%] sticky top-0 z-30">
    <div class="absolute inset-0 backdrop-blur-lg z-0"></div>

    <div
      class="flex flex-col max-w-[1440px] max-pads:px-5 max-pads:pb-3 grow mx-auto relative z-10"
    >
      <div
        class="justify-between items-center flex max-pads:px-0 px-5 py-5 max-pads:py-3 w-full"
      >
        <div class="flex flex-row gap-4 w-[60%]">
          <NuxtLink
            to="/"
            class="text-[20px] font-medium cursor-pointer text-white hover:text-red-500 duration-short"
            >AniList</NuxtLink
          >

          <AnimeBySearch class="max-pads:hidden" />
        </div>

        <PopperMenu>
          <template #popper-menu-head="{ openMenu }"
            ><div class="flex flex-row items-center gap-5">
              <Avatar
                v-if="user"
                class-avatar="w-[32px] h-[32px]"
                :img="userAvatar"
                @click="openMenu"
              />

              <NuxtLink v-else class="p-0 font-medium text-white" to="/sign-in"
                >Войти</NuxtLink
              >
            </div></template
          >

          <template #popper-menu-body="{ closeMenu }"
            ><MenuLayout
              class="right-[20px] translate-y-[calc(100%-10px)] max-pads:translate-y-[calc(100%-25px)] bottom-0 text-[14px]"
              @click="closeMenu"
            >
              <Button
                icon="icon-user"
                :width="20"
                :height="20"
                :label="user?.name!"
                class="cursor-default"
              />

              <Button
                icon="icon-settings"
                :width="20"
                :height="20"
                label="Мой Профиль"
                @click="goPageLK"
              />

              <Button
                icon="exit"
                :width="20"
                :height="20"
                label="Выйти"
                @click="logout"
              /> </MenuLayout
          ></template>
        </PopperMenu>
      </div>

      <AnimeBySearch class="hidden max-pads:flex" />
    </div>
  </div>
</template>

<style scoped></style>
