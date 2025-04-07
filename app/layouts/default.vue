<script setup lang="ts">
import Header from "@/widgets/header";

</script>

<template>
    <div class="image">
        <Header />

        <slot/>
    </div>
</template>

<style scoped>
.image {
  background-image: url("@/shared/public/images/bg.jpg");
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
  overflow-y: scroll;
}
</style>