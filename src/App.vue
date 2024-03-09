<script setup>
import { routerView } from "vue-router";
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
