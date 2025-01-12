<script setup>
import { TextInput, Checkbox, Button } from "frappe-ui";
import { ref, watch, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import Incoming from "./Incoming.vue";
import Outgoing from "./Outgoing.vue";
import {create_email_account} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const router = useRouter();
const route = useRoute();

const state = ref({
  incoming: null,
  outgoing: null,
});
const emit = defineEmits(['update:email'])
const incoming_data = ref({})
const outgoing_data = ref({})
const other_details = ref({
  address: null,
  account_name: null,
  service: null,
  domain: null,
  method: null,
  password: null,
  ascii: null,
  diff_email: null,
});
// Function to change the hash
const handle_tab = (data) => {
  router.push("#" + data);
};

// Reactive watcher for hash value
watch(
  () => route.hash,
  (newHash) => {
    console.log("Current hash:", newHash);
    // Perform any additional logic here based on the hash value
  }
);

// Initial hash check
console.log("Initial hash:", route.hash);
const handle_data = () => {
  router.push("#" + "details");
};


const incomingRef = ref(null)
const outgoingRef = ref(null)

const handle_save = async() => {
  const formData = {
    details: other_details.value,
    incoming_data: incoming_data.value,
    outgoing_data: outgoing_data.value
  }

  console.log('Form data:', formData)
  const res = await create_email_account(formData)
  if(res.statusCode == 200){
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
    emit('update:email', res.data)
  }else{
    toast.success(res.message, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
        style: {
          background: "#FFF5F5",
          color: "black",
          padding: "4px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid red",
        },
      });
  }
  // Handle your save logic here
}

const handle_incoming_data =(data)=>{
  incoming_data.value = data
}
const handle_outgoing_data =(data)=>{
  outgoing_data.value = data
}
</script>

<template>
  <div
    class="w-full p-2 flex justify-between"
    style="border-bottom: solid 1px #e5e4e2"
  >
    <div class="flex">
      <div class="p-1">
        <Button
          @click="handle_tab('details')"
          :variant="route.hash === '#details' ? 'solid' : 'outline'"
          theme="gray"
          size="sm"
          label="Details"
        >
          Details
        </Button>
      </div>
      <div class="p-1">
        <Button
          v-if="state.incoming"
          @click="handle_tab('incoming')"
          :variant="route.hash === '#incoming' ? 'solid' : 'outline'"
          theme="gray"
          size="sm"
          label="Incoming"
        >
          Incoming
        </Button>
      </div>
      <div class="p-1">
        <Button
          v-if="state.outgoing"
          @click="handle_tab('outgoing')"
          :variant="route.hash === '#outgoing' ? 'solid' : 'outline'"
          theme="gray"
          size="sm"
          label="Outgoing"
        >
          Outgoing
        </Button>
      </div>
    </div>
    <div class="flex w-full justify-end">
      <Button @click="handle_save"> Save </Button>
    </div>
    <div></div>
  </div>

  <div class="flex flex-col justify-center" v-if="route.hash === '#details'">
    <div class="container mx-auto my-10">
      <span class="text-2xl">Account</span>
      <br />
      <div class="flex">
        <div>
          <div class="p-2 flex">
            <span class="px-6">Email Address</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="email@example.com"
              :disabled="false"
              :modelValue="other_details.address"
              v-model="other_details.address"
            />
          </div>
          <div class="p-2 flex justify-between">
            <span class="px-6">Service</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="gmail"
              :disabled="false"
              :modelValue="other_details.service"
              v-model="other_details.service"
            />
          </div>
        </div>
        <div>
          <div class="p-2 flex">
            <span class="px-6">Email Account Name</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="name@example.com"
              :disabled="false"
              :modelValue="other_details.account_name"
              v-model="other_details.account_name"
            />
          </div>
          <div class="p-2 flex justify-between">
            <span class="px-6">Domain</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="example.com"
              :disabled="false"
              :modelValue="other_details.domain"
              v-model="other_details.domain"
            />
          </div>
        </div>
      </div>
      <div class="p-2">
        <Checkbox
          size="sm"
          :value="false"
          v-model="state.incoming"
          label="Enable Incoming"
          @click="handle_data()"
        />
      </div>
      <div class="p-2">
        <Checkbox
          size="sm"
          :value="false"
          v-model="state.outgoing"
          label="Enable Outgoing"
          @click="handle_data()"
        />
      </div>
    </div>
    <div
      class="w-full"
      style="border-bottom: solid 1px #e5e4e2; border-top: solid 1px #e5e4e2"
    >
      <div class="container mx-auto my-10">
        <span class="text-2xl">Authentication</span>
        <br />
        <div class="flex">
          <div>
            <div class="p-2 flex justify-between">
              <span class="px-6">Method</span>
              <TextInput
                :type="'text'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="imap"
                :disabled="false"
                :modelValue="other_details.method"
                v-model="other_details.method"
              />
            </div>
            <div class="p-2 flex justify-between">
              <span class="px-6">Password</span>
              <TextInput
                :type="'text'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="password"
                :disabled="false"
                :modelValue="other_details.password"
                v-model="other_details.password"
              />
            </div>
          </div>
          <div>
            <div class="p-2 flex">
              <div class="p-2">
                <Checkbox
                  size="sm"
                  :value="false"
                  v-model="other_details.diff_email"
                  label="Use different Email Id"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="p-2">
          <Checkbox size="sm" :value="false" label="Awaiting password" />
        </div>
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="other_details.ascii"
            label="Use ASCII encoding for password"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="route.hash === '#incoming'">
    <Incoming @update:incomingData="handle_incoming_data" :data="incoming_data" ref="incomingRef" />
  </div>
  <div v-else>
    <Outgoing @update:outgoingData="handle_outgoing_data" :data="outgoing_data" ref="outgoingRef" />
  </div>
</template>

<style scoped></style>
