<script setup>
import { ref, computed, watch } from "vue";
import inDepthAnalysisForm from "@/data/in-depth-analysis.json";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/button/Button.vue";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-vue-next";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/use-toast";
import { DateFormatter } from "@internationalized/date";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const { toast } = useToast();

const clauses = ref([
  {
    id: "1",
    name: "Clause 1",
    type: "Type 1",
    content: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    name: "Clause 2",
    type: "Type 2",
    content: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    name: "Clause 3",
    type: "Type 3",
    content: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]);

const isPending = ref(false);
const currentClauseIndex = ref(-1);
const allowEdit = ref(inDepthAnalysisForm.allowEdit.default);

const lastUpdatedDf = new DateFormatter("en-US", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const formSchema = toTypedSchema(
  z.object({
    clause: z.string({
      required_error: inDepthAnalysisForm.clauseContent.errors.required,
    }),
    selectedClause: z.enum(
      clauses.value.map((option) => option.id),
      { required_error: inDepthAnalysisForm.selectedClause.errors.required }
    ),
    analysisType: z.enum(
      inDepthAnalysisForm.analysisType.options.map((option) => option.value),
      { required_error: inDepthAnalysisForm.analysisType.errors.required }
    ),
  })
);

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const handleSelectedClauseChange = (clauseId) => {
  const selectedClause = clauses.value.find((clause) => clause.id == clauseId);
  setFieldValue("clause", selectedClause.content);
  currentClauseIndex.value = selectedClause.id;
};

const handleClauseChange = (newContent) => {
  clauses.value[currentClauseIndex.value].content = newContent;
};

const onSubmit = handleSubmit(async (values) => {
  isPending.value = true;
  // TODO handle form
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(values);
  isPending.value = false;
});

const handleCopy = () => {
  navigator.clipboard.writeText("Hello World");

  toast({
    description: "Copied to clipboard",
    duration: 400,
    class: "py-4",
  });
};
</script>

<template>
  <div class="px-1">
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
    <form class="space-y-2" @submit="onSubmit">
      <!-- selectedClause -->
      <FormField v-slot="{ componentField }" name="selectedClause">
        <FormItem>
          <FormLabel>{{ inDepthAnalysisForm.selectedClause.name }}</FormLabel>
          <FormDescription>{{
            inDepthAnalysisForm.selectedClause.description
          }}</FormDescription>
          <Select
            v-on:update:modelValue="handleSelectedClauseChange"
            v-bind="componentField"
          >
            <SelectTrigger>
              <SelectValue
                :placeholder="inDepthAnalysisForm.selectedClause.placeholder"
              />
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                <SelectItem
                  v-for="clause in clauses"
                  :key="clause.id"
                  :value="clause.id"
                >
                  {{ clause.name }}
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- allow edit -->
      <div class="flex items-center gap-2">
        <Switch v-on:update:checked="(checked) => (allowEdit = checked)" />
        <span>{{ inDepthAnalysisForm.allowEdit.name }}</span>
      </div>

      <!-- clauseContent -->
      <FormField v-slot="{ componentField }" name="clause">
        <FormItem>
          <FormLabel>{{ inDepthAnalysisForm.clauseContent.name }}</FormLabel>
          <FormDescription>{{
            inDepthAnalysisForm.clauseContent.description
          }}</FormDescription>
          <FormControl>
            <Textarea
              v-on:update:modelValue="handleClauseChange"
              :disabled="!allowEdit || currentClauseIndex < 0"
              v-bind="componentField"
              :placeholder="inDepthAnalysisForm.clauseContent.placeholder"
              rows="7"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- analysisType -->
      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="analysisType"
      >
        <FormItem class="space-y-3 pb-5">
          <FormLabel>{{ inDepthAnalysisForm.analysisType.name }}</FormLabel>
          <FormDescription>{{
            inDepthAnalysisForm.analysisType.description
          }}</FormDescription>
          <FormControl>
            <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
              <FormItem
                v-for="option in inDepthAnalysisForm.analysisType.options"
                :key="option.value"
                class="flex items-center space-y-0 gap-x-3"
              >
                <FormControl>
                  <RadioGroupItem :value="option.value" />
                </FormControl>
                <FormLabel class="font-normal">{{ option.name }}</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="block mx-auto" type="submit">Analyze document</Button>
    </form>
    <Separator class="my-5" />
    <div class="">
      <h3 class="font-medium mb-2">Analysis</h3>
      <Skeleton v-if="isPending" class="h-[200px]" />
      <div v-else class="relative">
        <Button
          @click="handleCopy"
          variant="ghost"
          title="copy"
          class="absolute top-1 right-1 size-6 p-2 rounded-full"
        >
          <Copy class="size-4 shrink-0" />
        </Button>
        <Textarea
          rows="9"
          :disabled="false"
          placeholder="Here you'll find the analysis"
        />
      </div>
      <span v-if="true" class="text-xs text-neutral-400 text-center block">
        Select a clause and type to see the analysis
      </span>
    </div>
  </div>
</template>
