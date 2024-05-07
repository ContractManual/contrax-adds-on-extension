<script setup>
import { ref, computed, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import NamedLucideIcon from "@/components/NamedLucideIcon.vue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-vue-next";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import routes from "../router";

const router = useRouter();

const currentHop = ref(0);
const maxHops = ref(0);
const sheetOpen = ref(false);

// watch(sheetOpen, (isOpen) => {
//   console.log("Sheet is open:", isOpen);
// });

router.afterEach((to, from) => {
  if (from?.path !== to?.path) {
    maxHops.value += 1;
    currentHop.value += 1;
  }
});

const hasNext = computed(() => currentHop.value < maxHops.value);
const hasPrevious = computed(() => currentHop.value > 0);
</script>

<template>
  <header>
    <Sheet :open="sheetOpen" v-on:update:open="sheetOpen=!sheetOpen">
      <SheetTrigger class="flex justify-end fixed top-0 right-0 left-0 bg-white">
        <Button variant="ghost" class="">
          <Menu class="size-6 text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent class="p-0 flex justify-between flex-col border-0">
        <div class="p-1">
          <SheetHeader>
            <SheetTitle class="text-left">Settings</SheetTitle>
            <SheetDescription class="text-left">
              Navigation and settings
            </SheetDescription>
          </SheetHeader>

          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList class="max-h-[600px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem
                  v-for="route in routes"
                  :key="route.path"
                  :value="`${route.name}|${route.meta.displayName}`"
                >
                  <router-link
                  :key="route.path"
                  :to="route.path"
                  @click="sheetOpen=false"
                    :data-current-page="
                      router.currentRoute.value.name === route.name
                        ? true
                        : undefined
                    "
                    class="flex items-center gap-x-2"
                  >
                  <NamedLucideIcon
                    :icon="route.meta.icon"
                    class="h-4 w-4 text-black"
                  />
                    <span class="">{{ route.meta?.displayName || route.name }}</span>
                  </router-link>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem value="profile"> Profile </CommandItem>
                <CommandItem value="billing"> Billing </CommandItem>
                <CommandItem value="settings"> Settings </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <SheetFooter
          class="bg-slate-900 sm:justify-center text-white text-center text-xs px-2 py-4 flex items-center justify-center"
        >
          <div class="">
            <span class="">See our website at</span>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
            >
              example.com
            </a>
            <div class="">
              <span> &copy {{ new Date().getFullYear() }} Example Inc. </span>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- <nav class="flex text-center divide-x-2 shadow-lg mb-2">
      <button
        :disabled="!hasPrevious || undefined"
        @click="
          currentHop -= 2;
          maxHops -= 1;
          $router.go(-1);
        "
        class="w-8 disabled:hover:bg-disabled disabled:bg-disabled disabled:text-black/50 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
        title="Go back"
        type="button"
      >
        &lt;
      </button>
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :data-current-page="
          router.currentRoute.value.name === route.name ? true : undefined
        "
        class="flex-1 capitalize data-[current-page]:cursor-default hover:data-[current-page]:bg-secondary-100 data-[current-page]:bg-secondary-100 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
      >
        {{ route.meta?.displayName || route.name }}
      </router-link>
      <button
        :disabled="!hasNext || undefined"
        @click="
          maxHops -= 1;
          $router.go(1);
        "
        class="w-8 disabled:hover:bg-disabled disabled:bg-disabled disabled:text-black/50 bg-primary-200 font-semibold py-1 text-white hover:bg-primary-100 transform duration-200"
        title="Go forward"
        type="button"
      >
        &gt;
      </button>
    </nav> -->
  </header>
</template>
