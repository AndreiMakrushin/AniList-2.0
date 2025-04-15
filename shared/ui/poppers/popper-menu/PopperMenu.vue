<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const menu = ref(false);

const closeMenu = () => {
  menu.value = false;
};

const openMenu = () => {
  menu.value = true;
};
</script>

<template>
  <div v-on-click-outside="closeMenu" class="flex flex-col gap-5">
    <slot name="popper-menu-head" :open-menu="openMenu" @openDrop="openMenu"></slot>

    <slot v-if="menu" :close-menu="closeMenu" name="popper-menu-body" @closeDrop="closeMenu"></slot>
  </div>
</template>

<style scoped></style>
