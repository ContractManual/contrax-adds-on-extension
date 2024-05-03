<script setup>
import AppMenu from "./partials/AppMenu.vue";
import Footer from "./partials/Footer.vue";
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <!-- used for `useToast` hook in any place in the app -->
  <Toaster /> 

  <div class="min-h-screen flex flex-col justify-between">
    <div class="">
      <AppMenu />
      <main class="px-1">
        <router-view />
      </main>
    </div>
    <Footer />
</div>
</template>
