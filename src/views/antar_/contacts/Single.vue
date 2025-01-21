<script setup>
import Nav from "./nav/Nav.vue";
import { ref } from "vue";
import { FeatherIcon, Button, Tabs } from "frappe-ui";

const state = ref({
    index: 0, // Initialize index to 0 for the first tab
    deals: [] // Initialize deals as an empty array
});
</script>

<template>
  <Nav></Nav>
  <div class="m-3">
    <div class="flex">
      <div
        class="p-16 w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center"
      >
        V
      </div>
      <div>
        <div class="mt-8 mx-4">
          <span class="text-gray-500 font-medium text-3xl my-1">
            MR vidhul prasad
          </span>
          <br />
          <div class="flex items-center">
            <span class="flex gap-2 my-auto">
              <FeatherIcon icon="mail" class="w-4 h-4 my-auto" />
              www.vidhul@gmail.com
              <FeatherIcon icon="phone" class="w-4 h-4 my-auto" />
              more
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="p-1">
            <Button
              :variant="'subtle'"
              :ref_for="true"
              theme="gray"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
            >
              <div class="flex gap-2">
                <FeatherIcon icon="pencil" class="w-4 h-4" />
                Edit
              </div>
            </Button>
          </div>
          <div class="p-1">
            <Button
              :variant="'subtle'"
              :ref_for="true"
              theme="red"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
            >
              <div class="flex gap-2">
                <FeatherIcon icon="trash" class="w-4 h-4" />
                Delete
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Tabs
    as="div"
    class="border rounded"
    v-model="state.index"
    :tabs="[
      {
        label: 'Deals',
        content: state.deals.length > 0 ? 'Deals available.' : 'No Deals Found',
      }
    ]"
  >
    <template #tab-panel="{ tab }">
      <div class="p-5">
        {{ tab.content }}
      </div>
    </template>
  </Tabs>

</template>

<style scoped></style>
