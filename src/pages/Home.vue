<script setup>
import { Skeleton } from "@/components/ui/skeleton";
import { docStore } from "../lib/doc-store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { getDoc } = docStore;
const router = useRouter();

onMounted(() => {
  getDoc(
    (doc) => {
      if (doc?.configured) {
        router.push({ name: "contract-analysis" });
      } else {
        router.push({ name: "setup" });
      }
    },
    (error) => console.error(error)
  );
});
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <div class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <div  class="flex flex-col space-y-3">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>
