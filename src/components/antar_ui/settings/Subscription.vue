<script setup>
import { defineEmits, onMounted, ref } from "vue";
import {Button,FeatherIcon} from "frappe-ui"
const emit = defineEmits(["go_back"]);
</script>

<template>
  <div class="flex justify-between p-5"> 
    <div class="flex">
      <div class="p-1">
        <Button
           @click="emit('go_back')"
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
         <FeatherIcon class="w-5" name="chevron-left" />
        </Button>
      </div>
      <span class="text-2xl font-medium my-auto">Subscription Management</span>
    </div>
    <div class="p-1">
      <Button
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        manage subscription
      </Button>
    </div>
  </div>
 <div class="p-5 flex justify-center">
     <div class="aspect-square w-[30%] bg-gray-50 flex justify-center items-center">
         <span>Management subscription details</span>
     </div>
 </div>
</template>

<style scoped></style>
