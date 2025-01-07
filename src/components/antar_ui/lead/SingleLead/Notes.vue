<script setup >
import { Button, FeatherIcon } from "frappe-ui";

</script>

<template>
   <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Notes </span>
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
          <FeatherIcon class="w-4" name="plus" /> <span>New Notes</span>
        </div>
      </Button>
    </div>
  </div>
</template>

<style  scoped>

</style>