<script setup lang="ts">
import user from '@/shared/assets/image/user.png'
defineProps<{
    img?: string
    classAvatar?: string
}>()
</script>

<template>
  <img :src="img ? `https://ivpfaitqeojbyulslqde.supabase.co/storage/v1/object/public/images/${img}` : user" class="rounded-full cursor-pointer object-cover" :class="classAvatar">
</template>
