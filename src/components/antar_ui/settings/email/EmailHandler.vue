<script setup>
import { TextInput, Checkbox, Button } from "frappe-ui";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Incoming from "./Incoming.vue";
import Outgoing from "./Outgoing.vue";

const router = useRouter();
const route = useRoute();

const state = ref({
  incoming: null,
  outgoing:null
});

// Function to change the hash
const handle_tab = (data) => {
  router.push("#"+data);
};

// Reactive watcher for hash value
watch(
  () => route.hash,
  (newHash) => {
    console.log("Current hash:", newHash);
    // Perform any additional logic here based on the hash value
  },
);

// Initial hash check
console.log("Initial hash:", route.hash);
const handle_data = ()=>{
    router.push("#"+'details');
}
</script>

<template>
  <div class="w-full p-2 flex" style="border-bottom: solid 1px #e5e4e2">
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
        v-if="state.incoming "
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
       v-if="state.outgoing "
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

  <div class="flex flex-col justify-center" v-if="route.hash === '#details' ">
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
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
            />
          </div>
          <div class="p-2 flex">
            <span class="px-6">Email Address</span>
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
        </div>
        <div>
          <div class="p-2 flex">
            <span class="px-6">Email Address</span>
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
          <div class="p-2 flex">
            <span class="px-6">Email Address</span>
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
                placeholder="Placeholder"
                :disabled="false"
                modelValue=""
              />
            </div>
            <div class="p-2 flex justify-between">
              <span class="px-6">Password</span>
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
          </div>
          <div>
            <div class="p-2 flex">
              <div class="p-2">
                <Checkbox
                  size="sm"
                  :value="false"
                  v-model="state.value"
                  label="Use different Email Id"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Awaiting password"
          />
        </div>
        <div class="p-2">
          <Checkbox
            size="sm"
            :value="false"
            v-model="state.value"
            label="Use ASCII encoding for password"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="route.hash === '#incoming' ">
     <Incoming/>
  </div>
  <div v-else>
     <Outgoing/>
  </div>
</template>

<style scoped></style>
