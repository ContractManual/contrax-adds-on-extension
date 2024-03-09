<script setup>
import AppMenu from "./partials/AppMenu.vue";
import Footer from "./partials/Footer.vue";
</script>

<template>
  <AppMenu />
  <main>
    <router-view />
  </main>
  <Footer />
</template>
