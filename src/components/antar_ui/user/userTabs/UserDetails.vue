<script setup>
import { TextInput } from "frappe-ui";
import { ref,defineProps } from "vue";
const props = defineProps({
  details: Object,
});
const user_details = ref(props.details);
</script>

<template>
  <div class="m-5">
    <span class="text-2xl">Basic Information</span>
  </div>
  <div class="container mx-auto">
    <div class="flex">
      <div class="p-2">
        <span>Email</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          :modelValue="user_details.email"
        />
      </div>
      <div class="p-2">
        <span>First Name</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          :modelValue="user_details.first_name"
        />
      </div>
      <div class="p-2">
        <span>Last Name</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          :modelValue="user_details.last_name"
        />
      </div>
    </div>
    <div class="flex">
      <div class="p-2">
        <span>Language</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          modelValue="English"
        />
      </div>
      <div class="p-2">
        <span>Time Zone</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          modelValue="Asia/Kolkata"
        />
      </div>
      <div class="p-2">
        <span>Phone Number</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="Placeholder"
          :disabled="false"
          modelValue="919876543210"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
