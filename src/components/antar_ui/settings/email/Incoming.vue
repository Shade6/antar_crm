<script setup>
import { Checkbox, TextInput } from "frappe-ui";
import { ref } from "vue";
const state = ref({
  value: null,
});
</script>

<template>
  <div style="border-bottom: solid 1px #e5e4e2">
    <div class="container mx-auto flex py-10">
      <div>
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
        <div class="p-2 flex justify-between">
          <span class="px-6">Attachment Limit (MB)</span>
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            modelValue=""
          />
        </div>
        <br />
        <span class="text-gray-400">Ignore attachments over this size</span>
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

  <div>
    <div class="container mb-10">
      <span>Document Linking</span>

      <div class="p-2 flex justify-around">
        <span class="px-6">Append To</span>
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

          <span class="text-gray-500">
            Begin typing for results. Append as communication <br />
            against this DocType (must have fields: "Sender" and "Subject").<br />
            These fields can be defined in the email settings <br />
            section of the appended doctype.</span
          >
        </div>

        <Checkbox
          size="sm"
          :value="false"
          v-model="state.value"
          label="Notify if unreplied"
        />
      </div>

      <Checkbox
        size="sm"
        :value="false"
        v-model="state.value"
        label="Create Contacts from Incoming Emails"
      />
      <br />
      <Checkbox
        size="sm"
        :value="false"
        v-model="state.value"
        label="Enable Automatic Linking in Documents"
      />
    </div>
  </div>
</template>

<style scoped></style>
