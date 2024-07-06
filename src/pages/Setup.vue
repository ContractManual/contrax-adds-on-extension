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
    contract_type: z.number(
      { required_error: setupOption.contract_type.errors.required }
    ),
    role: z.number(
      { required_error: setupOption.role.errors.required }
    ),
    bargaining_power: z.number(
      { required_error: setupOption.bargaining_power.errors.required }
    ),
    time_and_patience: z.number(
      { required_error: setupOption.time_and_patience.errors.required }
    ),
    risk_appetite: z.number(
      { required_error: setupOption.risk_appetite.errors.required }
    ),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  defaultValues: doc,
});

const onSubmit = handleSubmit(async (values) => {
  saveDoc(values,
    () => {
      router.push({ name: "contract-analysis" });
    },
    (error) => console.error(error)
  );
});
</script>

<template>
  <form class="space-y-2" @submit="onSubmit">
    <!-- contract_type -->
    <FormField v-slot="{ componentField }" name="contract_type">
      <FormItem>
        <FormLabel>{{ setupOption.contract_type.name }}</FormLabel>
        <FormDescription>{{ setupOption.contract_type.description }}</FormDescription>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue :placeholder="setupOption.contract_type.placeholder" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem
                v-for="typeOption in setupOption.contract_type.options"
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

    <!-- bargaining_power -->
    <FormField v-slot="{ componentField }" type="radio" name="bargaining_power">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.bargaining_power.name }}</FormLabel>
        <FormDescription>{{
          setupOption.bargaining_power.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="bargainingPowerOption in setupOption.bargaining_power.options"
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

    <!-- time_and_patience -->
    <FormField v-slot="{ componentField }" type="radio" name="time_and_patience">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.time_and_patience.name }}</FormLabel>
        <FormDescription>{{
          setupOption.time_and_patience.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="timeAndPatienceOption in setupOption.time_and_patience
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

    <!-- risk_appetite -->
    <FormField v-slot="{ componentField }" type="radio" name="risk_appetite">
      <FormItem class="space-y-3 pb-5">
        <FormLabel>{{ setupOption.risk_appetite.name }}</FormLabel>
        <FormDescription>{{
          setupOption.risk_appetite.description
        }}</FormDescription>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem
              v-for="riskAppetiteOption in setupOption.risk_appetite.options"
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
