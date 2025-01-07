<script setup>
import { Button, FeatherIcon } from "frappe-ui";
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Emails </span>
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
          <FeatherIcon class="w-4" name="plus" /> <span>New Email</span>
        </div>
      </Button>
    </div>
  </div>
  <div class="p-3 flex justify-center items-center">
    <div class="flex flex-col items-center">
      <FeatherIcon class="w-14" name="mail" />
      <span>No Email Communication</span>
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
          New Email
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
