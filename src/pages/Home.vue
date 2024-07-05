<script setup>
import Button from "@/components/ui/button/Button.vue";
import { useRouter } from "vue-router";
import { docStore } from "../lib/doc-store";

const router = useRouter();
const { getDoc, isConfigured } = docStore;


function getStarted() {
  getDoc();
  if (isConfigured()) {
    router.push({ name: "contract-analysis" });
  } else {
    router.push({ name: "setup" });
  }
}


</script>

<template>
  <div class="home">
    <Button variant="secondary" class="shadow-md mx-auto block" @click="getStarted">Get Started</Button>
  </div>
</template>
