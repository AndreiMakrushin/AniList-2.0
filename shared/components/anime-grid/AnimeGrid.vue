<template>
  <transition-group
    appear
    appear-active-class="transition duration-300 ease-in-out"
    appear-from-class="opacity-0 translate-y-5"
    appear-to-class="opacity-100 translate-y-0"
    enter-active-class="transition duration-300 ease-in-out"
    enter-from-class="opacity-0 translate-y-5"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in-out"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-5"
    tag="div"
    class="grid w-full h-full gap-[30px] p-5  xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2"
  >
    <slot />
  </transition-group>
</template>
