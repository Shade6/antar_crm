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
    <div class="p-4 bg-gray-200 rounded-xl w-1/2">
      <p class="text-xl font-black">
        {{ JSON.parse(props.details.change)?.title || "not found" }}
      </p>
      <span>
        {{ JSON.parse(props.details.change)?.content || "not found" }}
      </span>
    </div>
  </div>
  <div v-if="props.details.action == 'edit'">
    <div class="my-5 max-w-xl rounded-xl border px-2 py-2 text-gray-700 w-1/2">
      <div class="mb-2 flex justify-between">
        <p class="text-xl font-black">Affected Fields:</p>
      </div>
      <div class="space-y-4">
        <div
          v-for="(values, key) in getAffectedFields(
            JSON.parse(props.details.change)?.before,
            JSON.parse(props.details.change)?.after
          )"
          :key="key"
          class="text-sm"
        >
          <p>
            <strong
              >{{
                key == "user_id"
                  ? "user"
                  : key == "title"
                    ? "heading"
                    : key == "description"
                      ? "description"
                      : key == "big_status"
                        ? "status"
                        : key == "type"
                          ? "type"
                          : key == "task_status"
                            ? "task for"
                            : key == "note_text"
                              ? "note"
                              : ""
              }}:</strong
            >
          </p>
          <p class="ml-4 text-red-600">Before: {{ values.before }}</p>
          <p class="ml-4 text-green-600">After: {{ values.after }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="props.details.action == 'delete'">
    <div class="p-4 bg-red-50 rounded-xl w-1/2">
      <p class="text-xl font-black">
        <strike>
          {{ JSON.parse(props.details.change)?.title || "not found" }}
        </strike>
      </p>
      <span>
        <strike>
          {{ JSON.parse(props.details.change)?.content || "not found" }}
        </strike>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
