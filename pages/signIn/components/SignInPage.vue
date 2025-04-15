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
    <div class="flex flex-col gap-10 items-center max-pads:p-4 w-full">
      <h1 class="text-5xl max-pads:text-3xl text-center">Добро пожаловать в AniList</h1>

      <div class="flex flex-col gap-7 w-[460px] max-mobile:w-full">
        <Input v-model:model="user.email" type="text" placeholder="Email" />

        <Input v-model:model="user.password" type="password" placeholder="Password" />

        <div class="flex flex-col gap-3">
          <Button
            label="Войти"
            class="text-white bg-black w-full !p-[14px] justify-center items-center cursor-pointer duration-300"
            @click="handleLogin"
          />

          <div class="flex flex-row gap-3 justify-between">
            <NuxtLink to="/sign-up">Регистрация</NuxtLink>

            <NuxtLink>Забыли пароль?</NuxtLink>
          </div>
        </div>
      </div>

      <span class="text-red-500 text-base leading-5">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped></style>
