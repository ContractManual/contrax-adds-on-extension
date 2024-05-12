<script setup>
import { useRouter } from "vue-router";
import AppMenu from "./partials/AppMenu.vue";
import Footer from "./partials/Footer.vue";
import NamedLucideIcon from "@/components/NamedLucideIcon.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const { currentRoute } = useRouter();
</script>

<template>
  <!-- used for `useToast` hook in any place in the app -->
  <Toaster />

  <div class="min-h-screen flex flex-col justify-between">
    <div class="">
      <AppMenu />
      <main class="px-1 mt-14">
        <div
          v-if="
            currentRoute.meta.showHeadline === undefined ||
            currentRoute.meta.showHeadline
          "
          class="text-center"
        >
          <h3
            class="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center justify-center gap-3"
          >
            <span>{{ currentRoute.meta.displayName }}</span>
            <NamedLucideIcon :icon="currentRoute.meta.icon" class="inline-block size-7" />
          </h3>
          <p class="text-slate-500 text-sm">
            {{ currentRoute.meta.description }}
          </p>
        </div>
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>
