<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
</script>

<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
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
      toast
    </button>
  </div>
</template>
