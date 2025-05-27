<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps<{
  options: { id: string; statusRu: string; statusEn: string }[];
  placeholder?: string;
  textError?: string;
  stylesInput?: string;
  disabled?: boolean;
  clearable?: boolean;
}>();

const model = defineModel<string | null>();

const openDrop = ref(false);

const closeDrop = () => {
  openDrop.value = false;
};

const selectedTitle = computed(() => {
  if (!model.value) {
    return props.placeholder;
  } else {
    return props.options?.find((option) => option.id === model.value)?.statusRu;
  }
});
</script>

<template>
  <div v-on-click-outside="closeDrop" class="relative flex flex-col font-normal w-full grow">
    <div
      class="flex flex-col gap-2 rounded-lg overflow-hidden"
      :class="textError ? 'ring-red-500 ring-1 cursor-pointer' : 'cursor-pointer'"
    >
      <div
        class="w-full justify-between items-center flex py-4 pl-5 pr-3 bg-[#F5F5F5] cursor-pointer"
        :class="stylesInput"
        @click="openDrop = !openDrop"
      >
        <span
          class="text-base leading-5 font-medium text-black"
          :class="{'text-[#B1B1B1]': !model }"
        >
          {{ selectedTitle }}
        </span>

        <div class="flex flex-row items-center !text-gray_90 gap-2">
          <SvgSprite
            v-if="model && clearable"
            icon="icon-close-small"
            :width="15"
            :height="15"
            @click.stop="model = null"
          />

          <SvgSprite
            icon="icon-drop-down"
            :width="20"
            :height="20"
            :class="{ 'rotate-180': openDrop && !disabled }"
          />
        </div>
      </div>

      <div
        v-if="openDrop && !disabled"
        class="absolute z-50 bottom-0 text-black left-0 transform translate-y-[calc(100%+4px)] w-full p-1 ring-white ring-1 rounded-md bg-white shadow-upload"
      >
        <div class="overflow-y-auto scroll-custom max-h-216 pr-1">
          <div
            v-for="item in options.filter((item) => item.id !== model)"
            :key="item.id"
            class="flex flex-row-reverse items-center gap-2 py-2 px-3 cursor-pointer hover:bg-[#F5F5F5] rounded-4"
            @click="(model = item.id), (openDrop = false)"
          >
            <span
              class="relative flex w-[10px] h-[9px] justify-center items-center"
              :class="{ 'border-0': selectedTitle === item.statusRu }"
            >
              <SvgSprite
                v-if="selectedTitle === item.statusRu"
                icon="icon-selected"
                :width="10"
                :height="9"
                class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
              />
            </span>

            <span class="flex w-full text-base leading-5 font-medium">
              {{ item.statusRu }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <span v-if="textError" class="font-normal text-xs text-[#DF3838]">
      {{ textError }}
    </span>
  </div>
</template>

<style scoped></style>
