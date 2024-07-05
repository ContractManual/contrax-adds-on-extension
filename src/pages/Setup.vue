<script setup>
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/button/Button.vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateFormatter } from "@internationalized/date";
import { useRouter } from "vue-router";
import { docStore } from "@/lib/doc-store";

const router = useRouter();
const { doc, saveDoc } = docStore;

const df = new DateFormatter("en-US", {
  // TODO: get last updated date from BE
  dateStyle: "long",
});

const formSchema = toTypedSchema(
  z.object({
    type: z.enum(
      setupOption.type.options.map((option) => option.value),
      { required_error: setupOption.type.errors.required }
    ),
    role: z.enum(
      setupOption.role.options.map((option) => option.value),
      { required_error: setupOption.role.errors.required }
    ),
    bargainingPower: z.enum(
      setupOption.bargainingPower.options.map((option) => option.value),
      { required_error: setupOption.bargainingPower.errors.required }
    ),
    timeAndPatience: z.enum(
      setupOption.timeAndPatience.options.map((option) => option.value),
      { required_error: setupOption.timeAndPatience.errors.required }
    ),
    riskAppetite: z.enum(
      setupOption.riskAppetite.options.map((option) => option.value),
      { required_error: setupOption.riskAppetite.errors.required }
    ),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  defaultValues: doc,
});

const onSubmit = handleSubmit(async (values) => {
  const isSuccessful = saveDoc(values);
  if (isSuccessful) {
    router.push({ name: "contract-analysis" });
  }1
});
</script>

<template>
  <form class="space-y-2" @submit="onSubmit">
    <!-- type -->
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>{{ setupOption.type.name }}</FormLabel>
        <FormDescription>{{ setupOption.type.description }}</FormDescription>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue :placeholder="setupOption.type.placeholder" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem
                v-for="typeOption in setupOption.type.options"
                :key="typeOption.value"
                :value="typeOption.value"
                >{{ typeOption.name }}</SelectItem
              >
            </SelectContent>
          </SelectGroup>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- role -->
    <FormField v-slot="{ componentField }" name="role">
      <FormItem>
        <FormLabel>{{ setupOption.role.name }}</FormLabel>
        <FormDescription>{{ setupOption.role.description }}</FormDescription>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue :placeholder="setupOption.role.placeholder" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem
                v-for="roleOption in setupOption.role.options"
                :key="roleOption.value"
                :value="roleOption.value"
                >{{ roleOption.name }}</SelectItem
              >
            </SelectContent>
          </SelectGroup>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- bargainingPower -->
    <FormField v-slot="{ componentField }" type="radio" name="bargainingPower">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.bargainingPower.name }}</FormLabel>
        <FormDescription>{{
          setupOption.bargainingPower.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="bargainingPowerOption in setupOption.bargainingPower
                .options"
              :key="bargainingPowerOption.value"
              class="flex items-center space-y-0 gap-x-3"
            >
              <FormControl>
                <RadioGroupItem :value="bargainingPowerOption.value" />
              </FormControl>
              <FormLabel class="font-normal">{{
                bargainingPowerOption.name
              }}</FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- timeAndPatience -->
    <FormField v-slot="{ componentField }" type="radio" name="timeAndPatience">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.timeAndPatience.name }}</FormLabel>
        <FormDescription>{{
          setupOption.timeAndPatience.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="timeAndPatienceOption in setupOption.timeAndPatience
                .options"
              :key="timeAndPatienceOption.value"
              class="flex items-center space-y-0 gap-x-3"
            >
              <FormControl>
                <RadioGroupItem :value="timeAndPatienceOption.value" />
              </FormControl>
              <FormLabel class="font-normal">{{
                timeAndPatienceOption.name
              }}</FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- riskAppetite -->
    <FormField v-slot="{ componentField }" type="radio" name="riskAppetite">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.riskAppetite.name }}</FormLabel>
        <FormDescription>{{
          setupOption.riskAppetite.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="riskAppetiteOption in setupOption.riskAppetite.options"
              :key="riskAppetiteOption.value"
              class="flex items-center space-y-0 gap-x-3"
            >
              <FormControl>
                <RadioGroupItem :value="riskAppetiteOption.value" />
              </FormControl>
              <FormLabel class="font-normal">{{
                riskAppetiteOption.name
              }}</FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="block mx-auto" type="submit">Analyze document</Button>

    <div v-if="true" class="text-xs text-neutral-500 flex items-center justify-center gap-2">
      <span class="">Last updated:</span>
      <span class="">{{ df.format() }}</span>
    </div>
  </form>
</template>
