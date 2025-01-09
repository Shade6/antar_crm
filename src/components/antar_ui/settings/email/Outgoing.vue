<script setup>
import { Checkbox, TextInput } from "frappe-ui";
import { ref } from "vue";
const state = ref({
  value: null,
});
</script>

<template>
  <div class="w-full">
    <div class="container py-7 flex justify-between mx-auto" style="border-bottom: solid 1px #e5e4e2">
      <div class="">
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Default Incoming"
          />
          <br />
          <span class="text-gray-400"
            >e.g. replies@yourcomany.com. All replies will come to this
            inbox.</span
          >
        </div>
      </div>

      <div>
        <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Always use this email address as sender address"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Always use this name as sender name"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Send unsubscribe message in email"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Track Email Status"
          />
          <br />

          <span class="text-gray-500">
            Track if your email has been opened by the recipient.
Note: If you're sending to multiple recipients, even if 1 recipient reads the email, it'll be considered "Opened"
          </span>
      </div>
    </div>
  </div>
  <div style="border-bottom: solid 1px #e5e4e2">
    <div class="container mx-auto py-4">
      <span> Incoming (POP/IMAP) Settings </span>
      <div class="p-2">
        <Checkbox
          size="sm"
          :value="false"
          v-model="state.value"
          label="Use IMAP"
        />
        <br />
        <Checkbox
          size="sm"
          :value="false"
          v-model="state.value"
          label="Use SSL"
        />
        <br />
        <div class="p-2 flex">
          <span class="px-6">Incoming Server</span>
          <div>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
            />

            <span class="text-gray-500"
              >e.g. pop.gmail.com / imap.gmail.com</span
            >
          </div>
        </div>
        <br />
        <div class="p-2 flex ">
          <span class="px-6">Port</span>
          <div class="pl-24">
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
            />

            <span class="text-gray-500 ">
              If non-standard port  <br>
              (e.g. POP3: 995/110, IMAP: 993/143)</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
