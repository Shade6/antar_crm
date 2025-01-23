<script setup>

</script>

<template>
  <div
  
    class="p-3 h-[50vh] flex justify-center items-center"
  >
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

<style scoped>

</style>