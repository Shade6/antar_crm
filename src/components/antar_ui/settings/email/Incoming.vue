<script setup>
import { Checkbox, TextInput } from "frappe-ui";
import { ref, defineExpose, watch ,defineProps, onMounted} from "vue";
const state = ref({
  value: null,
});
const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
const emit = defineEmits(['update:incomingData']);

const incoming_details = ref({
  default_incoming: null,
  attachment_limit: null,
  imap: null,
  ssl: null,
  incoming_server: null, // Fixed property name from outgoing_server
  port: null,
  append_to: null,
  contact_from_incoming_email: null, // Fixed property name
  enable_automatic_linking: null,
  notify_if_un_replied: null,
})

// Watch for changes in incoming_details and emit updated data
watch(incoming_details, (newValue) => {
  emit('update:incomingData', {
    default_incoming: newValue.default_incoming,
    attachment_limit: newValue.attachment_limit,
    imap: newValue.imap,
    ssl: newValue.ssl,
    incoming_server: newValue.incoming_server,
    port: newValue.port,
    append_to: newValue.append_to,
    contact_from_incoming_email: newValue.contact_from_incoming_email,
    enable_automatic_linking: newValue.enable_automatic_linking,
    notify_if_un_replied: newValue.notify_if_un_replied
  });
}, { deep: true });

defineExpose({
  getData: () => {
    return {
      default_incoming: incoming_details.value.default_incoming,
      attachment_limit: incoming_details.value.attachment_limit,
      imap: incoming_details.value.imap,
      ssl: incoming_details.value.ssl,
      incoming_server: incoming_details.value.incoming_server,
      port: incoming_details.value.port,
      append_to: incoming_details.value.append_to,
      contact_from_incoming_email: incoming_details.value.contact_from_incoming_email,
      enable_automatic_linking: incoming_details.value.enable_automatic_linking,
      notify_if_un_replied: incoming_details.value.notify_if_un_replied
    }
  }
})
onMounted(()=>{
  incoming_details.value = props.data
})
</script>

<template>
  <div style="border-bottom: solid 1px #e5e4e2">
    <div class="container mx-auto flex py-10">
      <div>
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="incoming_details.default_incoming"
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
            placeholder="10"
            :disabled="false"
            :modelValue="incoming_details.attachment_limit"
            v-model="incoming_details.attachment_limit"
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
          v-model="incoming_details.imap"
          label="Use IMAP"
        />
        <br />
        <Checkbox
          size="sm"
          :value="false"
          v-model="incoming_details.ssl"
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
              placeholder="pop.gmail.com"
              :disabled="false"
              :modelValue="incoming_details.incoming_server"
              v-model="incoming_details.incoming_server"
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
              placeholder="995"
              :disabled="false"
              :modelValue="incoming_details.port"
              v-model="incoming_details.port"
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
            placeholder="Communication"
            :disabled="false"
            :modelValue="incoming_details.append_to"
            v-model="incoming_details.append_to"
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
          v-model="incoming_details.notify_if_un_replied"
          label="Notify if unreplied"
        />
      </div>

      <Checkbox
        size="sm"
        :value="false"
        v-model="incoming_details.contact_from_incoming_email"
        label="Create Contacts from Incoming Emails"
      />
      <br />
      <Checkbox
        size="sm"
        :value="false"
        v-model="incoming_details.enable_automatic_linking"
        label="Enable Automatic Linking in Documents"
      />
    </div>
  </div>
</template>

<style scoped></style>
