<script lang="ts" setup>
import type { IIconProps } from "./types"
import sprite from "@/shared/assets/sprite/sprite.svg?url"

defineProps<IIconProps>();
</script>

<template>
	<svg
		class="icon"
		:width="width"
		:height="height">
		<use :xlink:href="`${sprite}#${icon}`" />
	</svg>
</template>