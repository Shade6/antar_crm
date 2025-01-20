<script setup>
const props = defineProps({
  details: {
    type: Object,
    required: true,
  },
});
function getAffectedFields(before, after) {
  const affectedFields = {};

  for (const key in after) {
    if (after[key] !== before[key]) {
      affectedFields[key] = { before: before[key], after: after[key] };
    }
  }

  return affectedFields;
}
</script>

<template>
  <div v-if="props.details.action == 'create'">
    <div class="my-5 max-w-xl rounded-xl border px-4 py-6 text-gray-700">
      <div class="mb-2 flex justify-between">
        <p class="text-xl font-black">
          {{ JSON.parse(props.details.change)?.title || 'not found' }}
        </p>
        <span
          >task date :{{
            new Date(
              JSON.parse(props.details.change)?.created_at
            ).toLocaleDateString() || 'not found'
          }}</span
        >
      </div>
      <div class="mb-1">
        <p class="text-gray-500">
          {{ JSON.parse(props.details.change)?.description || 'not found' }}
        </p>

        <div class="flex gap-3">
          <span class="bg-gray-100 px-1 rounded-sm"
            >task status :
            {{ JSON.parse(props.details.change)?.big_status || 'not found' }}</span
          >
          <span class="bg-gray-100 px-1 rounded-sm"
            >task type : {{ JSON.parse(props.details.change)?.type || 'not found'   }}</span
          >
          <span class="bg-gray-100 px-1 rounded-sm"
            >task for :
            {{ JSON.parse(props.details.change)?.task_status || 'not found' }}</span
          >
        </div>
      </div>
      <div class="rounded-lg bg-gray-100 p-4">
        <p class="mb-2 text-gray-500">Your Note is</p>
        <p class="">{{ JSON.parse(props.details.change)?.note_text || 'not found'   }}</p>
      </div>
    </div>
  </div>

  <div v-if="props.details.action == 'delete'">
    <div class="my-5 max-w-xl rounded-xl border px-4 py-6  bg-red-50 text-gray-700">
      <div class="mb-2 flex justify-between">
        <p class="text-xl font-black">
          <strike>{{ JSON.parse(props.details.change)?.title || 'not found' }}</strike>
        </p>
        <span>
          <strike>task date :{{ new Date(JSON.parse(props.details.change)?.created_at).toLocaleDateString() || 'not found' }}</strike>
        </span>
      </div>
      <div class="mb-1">
        <p class="text-gray-500">
          <strike>{{ JSON.parse(props.details.change)?.description || 'not found' }}</strike>
        </p>

        <div class="flex gap-3">
          <span class="bg-red-100 px-1 rounded-sm">
            <strike>task status : {{ JSON.parse(props.details.change)?.big_status || 'not found' }}</strike>
          </span>
          <span class="bg-red-100 px-1 rounded-sm">
            <strike>task type : {{ JSON.parse(props.details.change)?.type || 'not found' }}</strike>
          </span>
          <span class="bg-red-100 px-1 rounded-sm">
            <strike>task for : {{ JSON.parse(props.details.change)?.task_status || 'not found' }}</strike>
          </span>
        </div>
      </div>
      <div class="rounded-lg  p-4">
        <p class="mb-2 text-gray-500"><strike>Your Note is</strike></p>
        <p class=""><strike>{{ JSON.parse(props.details.change)?.note_text || 'not found' }}</strike></p>
      </div>
    </div>
  </div>
  <div v-if="props.details.action == 'edit'">
  <div class="my-5 max-w-xl rounded-xl border px-4 py-6 text-gray-700">
    <div class="mb-2 flex justify-between">
      <p class="text-xl font-black">Affected Fields:</p>
    </div>
    <div class="space-y-4">
      <div 
        v-for="(values, key) in getAffectedFields(JSON.parse(props.details.change).before, JSON.parse(props.details.change).after)" 
        :key="key" 
        class="text-sm">
        <p><strong>{{ key == 'user_id' ? 'user' : key=='title' ? 'heading' : key=='description' ? 'description' : key=='big_status' ? 'status' : key=='type' ? 'type' : key=='task_status' ? 'task for' : key=='note_text' ? 'note' : '' }}:</strong></p>
        <p class="ml-4 text-red-600">Before: {{ values.before }}</p>
        <p class="ml-4 text-green-600">After: {{ values.after }}</p>
      </div>
    </div>
  </div>
</div>


</template>

<style scoped></style>
