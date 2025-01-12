<script setup>
import { Checkbox, TextInput } from "frappe-ui";
import { ref, defineExpose, onMounted, watch, defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
const emit = defineEmits(['update:outgoingData']);

const router = useRouter();
const state = ref({
  value: null,
});

const outgoing_details = ref({    
  default_outgoing: null,
  use_this_email_as_sender: null,
  use_this_name_as_sender: null,
  send_unsubscribe_message: null,
  track_email_status: null,
  imap: null,
  ssl: null,
  outgoing_server: null,
  port: null,
});

// Watch for route changes to preserve data
watch(outgoing_details, (newValue) => {
  emit('update:outgoingData', newValue);
}, { deep: true });

onMounted(()=>{
  outgoing_details.value = props.data
})

defineExpose({
  getData: () => outgoing_details.value
})
</script>

<template>
  <div class="w-full">
    <div class="container py-7 flex justify-between mx-auto" style="border-bottom: solid 1px #e5e4e2">
      <div class="">
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="outgoing_details.default_outgoing"
            label="Default outgoing"
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
              v-model="outgoing_details.use_this_email_as_sender"
            label="Always use this email address as sender address"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="outgoing_details.use_this_name_as_sender"
            label="Always use this name as sender name"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="outgoing_details.send_unsubscribe_message"
            label="Send unsubscribe message in email"
          />
          <br />
          <Checkbox
            size="sm"
            :value="false"
            v-model="outgoing_details.track_email_status"
            label="Track Email Status"
          />
          <br />

          <span class="text-gray-500">
            Track if your email has been opened by the recipient.
Note: If you're sending to multiple recipients, even if 1 recipient
 reads the email, it'll be considered "Opened"
          </span>
      </div>
    </div>
  </div>
    <div style="border-bottom: solid 1px #e5e4e2">
    <div class="container mx-auto py-4">
        <span> Outgoing (SMTP) Settings </span>
      <div class="p-2">
        <Checkbox
          size="sm"
          :value="false"
            v-model="outgoing_details.imap"
          label="Use IMAP"
        />
        <br />
        <Checkbox
          size="sm"
          :value="false"
          v-model="outgoing_details.ssl"
          label="Use SSL"
        />
        <br />
        <div class="p-2 flex">
          <span class="px-6">Outgoing Server</span>
          <div>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="pop.gmail.com"
              :disabled="false"
              :modelValue="outgoing_details.outgoing_server"
              v-model="outgoing_details.outgoing_server"
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
              :modelValue="outgoing_details.port"
              v-model="outgoing_details.port"
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
