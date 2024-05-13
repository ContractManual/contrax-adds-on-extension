<script setup>
import Button from "@/components/ui/button/Button.vue";
import { DateFormatter } from "@internationalized/date";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TriangleAlert, Info, ThumbsUp } from "lucide-vue-next";
import { stats } from "@/data/basic-review.json";

const lastUpdatedDf = new DateFormatter("en-US", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
});
</script>

<template>
  <div class="">
    <div class="text-center">
      <Button class="mb-2">Scan document</Button>
      <div
        v-if="lastUpdatedDf"
        class="text-xs text-neutral-500 flex items-center justify-center gap-2"
      >
        <span class="">Last updated:</span>
        <span class="">{{ lastUpdatedDf.format() }}</span>
      </div>
    </div>
      <Accordion v-if="lastUpdatedDf" type="single" class="w-full" collapsible>
        <AccordionItem
          v-for="stat in stats"
          :key="stat.value"
          :value="stat.value"
        >
          <AccordionTrigger>
            <div class="flex justify-start items-start gap-2">
              <TriangleAlert v-if="stat.score < 50" class="text-yellow-600 size-4" />
              <Info v-else-if="stat.score < 80" class="text-blue-600 size-4" />
              <ThumbsUp v-else class="text-green-600 size-4" />
              <div class="flex flex-col text-left">
                <span class="text-sm">{{ stat.name }}</span>
                <span class="text-xs text-neutral-500">{{ stat.label }}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {{ stat.value }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div v-else class="flex flex-col text-center pt-12">
        <span class="text-lg font-medium">Scan your document to see the analysis</span>
        <span class="text-sm text-neutral-500">press the button above</span>
      </div>
    </div>
</template>
