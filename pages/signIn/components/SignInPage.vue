<script setup lang="ts">
import type { ILoginForm } from "@/shared/types";
import { useAuth } from "@/shared/composables/useAuth";
import { useGetUser } from "@/shared/helpers/useGetUser";

const user: ILoginForm = {
  email: "",
  password: "",
};

const error = ref<string | null>(null);

const handleLogin = async () => {
  const result = await useAuth(user);

  if (result.error) {
    error.value = result.error.message;
  } else {
    await useGetUser();
    navigateTo("/");
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center">
    <div class="flex flex-col gap-10 items-center w-full">
      <h1 class="text-5xl">Добро пожаловать в AniList</h1>

      <div class="flex flex-col gap-10 w-[460px]">
        <Input v-model:model="user.email" type="text" placeholder="Email" />

        <Input v-model:model="user.password" type="password" placeholder="Password" />

        <div class="flex flex-col gap-3">
          <Button
            label="Войти"
            class="text-white bg-black text-base w-full !p-3 cursor-pointer duration-300"
            @click="handleLogin"
          />

          <div class="flex flex-row gap-3 justify-between">
            <NuxtLink to="/signup">Регистрация</NuxtLink>

            <NuxtLink>Забыли пароль?</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
