<script setup >
import {ref} from "vue"
import { Button, FeatherIcon } from "frappe-ui";
const array_list = ref([])
</script>

<template>
   <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Calls </span>
    <div class="p-1">
      <Button
        style="width: 150px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="phone" /> <span>Make a Call</span>
        </div>
      </Button>
    </div>
  </div>

  <div>
      <div v-if="array_list.length == 0">
          <span> call details is on maintanance</span>
      </div>
  </div>
</template>

<style  scoped>

</style>