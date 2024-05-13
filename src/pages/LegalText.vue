<script setup>
import legalTextForm from "@/data/legal-text-form.json";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
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

const formSchema = toTypedSchema(
  z.object({
    clause: z.string({ required_error: legalTextForm.clause.errors.required }),
    type: z.enum(
      legalTextForm.type.options.map((option) => option.value),
      { required_error: legalTextForm.type.errors.required }
    ),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  // TODO handle form
  console.log(values);
});

const handleCopy = () => {
  navigator.clipboard.writeText("Hello World");
};
</script>

<template>
  <div class="px-1">
    <form class="space-y-2" @submit="onSubmit">
      <!-- type -->
      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>{{ legalTextForm.type.name }}</FormLabel>
          <FormDescription>{{
            legalTextForm.type.description
          }}</FormDescription>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue :placeholder="legalTextForm.type.placeholder" />
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                <SelectItem
                  v-for="typeOption in legalTextForm.type.options"
                  :key="typeOption.value"
                  :value="typeOption.value"
                >
                  {{ typeOption.name }}
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- clause -->
      <FormField v-slot="{ componentField }" name="clause">
        <FormItem>
          <FormLabel>{{ legalTextForm.clause.name }}</FormLabel>
          <FormDescription>{{
            legalTextForm.clause.description
          }}</FormDescription>
          <FormControl>
            <Textarea
              v-bind="componentField"
              :placeholder="legalTextForm.clause.placeholder"
              rows="7"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="block mx-auto" type="submit">Analyze document</Button>
    </form>
    <Separator class="my-5" />
    <div class="">
      <h3 class="font-medium mb-2">Analysis</h3>
      <div class="relative">
        <Button @click="handleCopy" variant="ghost" title="copy" class="absolute top-1 right-1 size-6 p-2 rounded-full"> 
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
