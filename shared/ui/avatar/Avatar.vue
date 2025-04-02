<script setup lang="ts">
import user from '@/shared/assets/image/user.png'
defineProps<{
    img?: string
    style?: string
}>()
</script>

<template>
  <img :src="img ? `https://ivpfaitqeojbyulslqde.supabase.co/storage/v1/object/public/images/${img}` : user" class="rounded-[50%] cursor-pointer object-cover overflow-hidden" :class="style">
</template>
