<script setup>
import Button from "@/components/ui/button/Button.vue";
import { docStore } from "../lib/doc-store";

const { getDoc } = docStore;

function getStarted() {
  getDoc();
}

</script>

<template>
  <div class="home">
    <Button variant="secondary" class="shadow-md mx-auto block" @click="getStarted">Get Started</Button>
  </div>
</template>
