<script setup>
import AppMenu from "./partials/AppMenu.vue";
import Footer from "./partials/Footer.vue";
</script>

<template>
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
