<script setup lang="ts">
import setupOption from "@/data/setup-form.json";
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
import Button from "@/components/ui/button/Button.vue";

const validation = z.object(
  setupOption.reduce(
    (acc, item) => ({
      ...acc,
      [item.name]: z
        .enum(
          item.options.map((op) => op.value),
          { requiredError: item.errors.required }
        )
        .describe(item.label),
    }),
    {}
  )
);

const form = useForm({
  validationSchema: toTypedSchema(validation),
});

const onSubmit = form.handleSubmit((values) => {
  // TODO
  console.log("Form submitted!", values);
});
</script>

<template>
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Setup</h3>
  <p class="text-muted-foreground">This is the setup page.</p>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem v-auto-animate>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Analyze document</Button>
  </form>
</template>
