<script setup lang="ts">
import { useAuth } from "@/shared/composables/useAuth"
import {useRegister} from "@/shared/composables/useRegister"
import {useGetUserSession} from "@/shared/composables/useGetUserSession"

const user = {
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
}

onMounted(async() => {
 const result = await useGetUserSession()

 if (result.error) {
   console.log('Get user failed:', result.error.message)
 }
 else {
   console.log('Get user:', result.data)
 }
})

const handleRegister = async () => {
  const result = await useRegister(register)

  if (result.error) {

    console.log('Register failed:', result.error.message)
  }else{
    console.log('Registered user:', result.data)
  }
}
</script>

<template>
  <div class="text-7xl" @click="handleLogin">
ergfwr
  </div>

  <div class="text-7xl" @click="handleRegister">
    Register
  </div>
</template>

<style scoped>

</style>

