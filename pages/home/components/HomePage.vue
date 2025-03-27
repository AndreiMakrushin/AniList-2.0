<script setup lang="ts">
import { useAuth } from "@/shared/composables/useAuth"
const { login } = useAuth()

const handleLogin = async () => {
  const result = await login('andrei18makrushin@gmail.com', '12Apple2')
  
  if (result.error) {

    console.log('Auth failed:', result.error.message)
  } else {
    console.log('Logged in user:', result.data)
  }
}
</script>

<template>
  <div class="text-7xl" @click="handleLogin">
ergfwr
  </div>
</template>

<style scoped>

</style>

