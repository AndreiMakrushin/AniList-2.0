<script setup lang="ts">
import type { IRegisterForm } from "@/shared/types";
import { useRegister } from "@/shared/composables/useRegister";

const register: IRegisterForm = {
  name: "",
  email: "",
  password: "",
};

const errorMessage = ref<string | null>(null);
const complited = ref<string | null>(null);
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  const { data, error } = await useRegister(register);

  if (error) {
    errorMessage.value = error.message;
    loading.value = false;
  } else {
    if (data) {
      loading.value = false;
      errorMessage.value = null;
      complited.value = `👆 Вы успешно зарегистрировались, теперь <span class="font-bold underline">подтвердите</span> свою почту и можете пользоваться сайтом `;

      setTimeout(() => {
        navigateTo("/sign-in");
      }, 3000);
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center">
    <div class="flex flex-col gap-10 items-center max-pads:p-4 w-full">
      <h1 class="text-5xl max-pads:text-3xl text-center">Регистрация в AniList</h1>

      <div class="flex flex-col gap-7 w-[460px] max-mobile:w-full">
        <Input v-model:model="register.name" type="text" placeholder="Name" />

        <Input v-model:model="register.email" type="text" placeholder="Email" />

        <Input v-model:model="register.password" type="password" placeholder="Password" />

        <div class="flex flex-col gap-3">
          <Button
            :disabled="loading"
            label="Зарегистрироваться"
            class="text-white bg-black w-full !p-[14px] justify-center items-center cursor-pointer duration-300"
            @click="handleRegister"
          />
        </div>
      </div>

      <span
        :class="complited ? 'text-green-500' : 'text-red-500'"
        class="text-base leading-5 max-w-[460px]"
        v-html="errorMessage || complited"
      ></span>
    </div>
  </div>
</template>

<style scoped></style>
