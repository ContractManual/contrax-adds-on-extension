<script setup>
import Button from "@/components/ui/button/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="home">
    <button
      type="button"
      @click="
        () =>
          toast({
            title: 'Hello, World!',
            description: 'This is a toast message.',
            
          })
      "
    >
  </button>
  <Button variant="secondary" class="shadow-md mx-auto block" @click="() => router.push({ name: 'setup' })">Get Started</Button>
  </div>
</template>
