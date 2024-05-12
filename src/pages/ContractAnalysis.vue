<script setup>
import routes from "../router";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import NamedLucideIcon from "@/components/NamedLucideIcon.vue";

const routesToExclude = ["home", "contract-analysis"];
const routesToDisplay = routes.filter((route) => !routesToExclude.includes(route.name));

const router = useRouter();
</script>

<template>
  <div class="grid grid-cols-2 gap-2 px-1">
    <Button
      v-for="route in routesToDisplay"
      :key="route.name"
      @click="() => router.push({ name: route.name })"
      variant="secondary"
      class="flex items-center justify-center flex-col gap-2 h-fit shadow-md p-3"
    >
      <NamedLucideIcon :icon="route.meta.icon" class="size-6 shrink-0" />
      <span class="shrink-0">{{ route.meta.displayName }}</span>
    </Button>
  </div>
</template>
