<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import routes from "../router";

const router = useRouter();

const hops = ref(0);
const maxHops = ref(0);

router.afterEach((to, from) => {
  if (from?.path !== to?.path) {
    maxHops.value += 1;
    hops.value += 1;
  }
});

const hasNext = computed(() => hops.value < maxHops.value);
const hasPrevious = computed(() => hops.value !== 0);
</script>

<template>
  <header>
    <nav class="flex text-center divide-x-2 shadow-lg mb-2">
      <button
        :disabled="!hasPrevious || undefined"
        @click=" hops -= 2; maxHops -= 1; $router.go(-1);"
        class="w-8 disabled:opacity-40 disabled:hover:bg-primary-200 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
        title="Go back"
        type="button"
      >
        &lt;
      </button>
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :data-current-page="router.currentRoute.value.name === route.name ? true : undefined"
        class="flex-1 capitalize data-[current-page]:cursor-default hover:data-[current-page]:bg-secondary-100 data-[current-page]:bg-secondary-100 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
      >
        {{ route.meta?.displayName || route.name }}
      </router-link>
      <button
        :disabled="!hasNext || undefined"      
        @click="maxHops -= 1; $router.go(1);"
        class="w-8 disabled:opacity-40 disabled:hover:bg-primary-200 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
        title="Go forward"
        type="button"
      >
        &gt;
      </button>
    </nav>
  </header>
</template>
