<script setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";

const props = defineProps({
  icon: { type: String, required: false },
  class: { type: String, required: false },
});

const icon = computed(() => icons[props.icon]);
</script>

<template>
  <component v-if="icon" :is="icon" :class="props.class" />
</template>