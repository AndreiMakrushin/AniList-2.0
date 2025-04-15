<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const menu = ref(false);

const stateMenu = () => {
  menu.value = !menu.value;
};
</script>

<template>
  <div v-on-click-outside="stateMenu" class="flex flex-col gap-5">
    <slot name="popper-menu-head" :open-menu="stateMenu" @click="stateMenu"></slot>

    <slot v-if="menu" :close-menu="stateMenu" name="popper-menu-body" @click="stateMenu"></slot>
  </div>
</template>

<style scoped></style>
