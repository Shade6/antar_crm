<script setup>
import { Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";

// Set the default value to one of the available options
const selected_option = ref();
const selected_list = ref([]);

watch(
  () => selected_option.value,
  (new_) => {
    selected_list.value.push(new_);
  }
);
const handle_remove_value = (data) => {
  selected_option.value.filter((val) => val !== data);
};
</script>

<template>
  <div class="w-1/2 h-64 bg-gray-100 shadow-lg p-3 rounded-sm m-3">
    <div class="py-3 text-lg" style="border-bottom: solid 2px lightgray">
      <span class="font-bold text-xl">Post to</span>
    </div>
    <div>
      <div class="p-2">
        <Autocomplete
          class="border shadow-lg"
          :options="[
            {
              label: 'Twitter',
              value: 'Twitter',
              image:
                'data:image/png;base64,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',
            },
            {
              label: 'Facebook',
              value: 'Facebook',
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAZlBMVEU7V53///8mSZf6+/0zUppidqzDyd0qS5jJzuAaQpQvT5l6irdEXqEWQJPl5/BxgbO0vNWDkbu9xNqlr80JO5FpfLCeqMnO0+OPnMKWosaJl79ccasAOJDc4Ovz9fjt7vRTaaYAMY0l7Ru/AAACfElEQVR4nO3c3ZKiMBAF4BiigagQQEBlnHHf/yUX1toaVzaK1UmaqjmnyjsuvuInphttsRqS22InFpBdYfPRI4aPFVJxe25RUtgbqtxzW+6zL0eUXZRpUNmVyLkR0+TCSm7DY6QVxULu8e+oQixiLfg3CyQhCIIgCBIqRsshmbxFa6N4d0zK7D9UcaxttUmrqrK2bk/nsulFdvhgIknRtN3KkSRjEKnMtJfERRrCgJK9fQJiQSlZf74wRUfp5usVKToqOz+7l3hQup5BiozK5pmiovRpnikmyjQzTRFRSsx47mKj9KslkwGl+tmmeCiZLg+lmjmrZmSUmX9HRUS9caJiocz2DVMsVLZZIErlLxzJXSKh1PrZxq6rj+X2LmWcksacnaLPVmljhtrqLlFMwrQuU77mKF3+RFeu86QMl0kYV413YnyxIR0PX87ZsJeOrVSqGVHasSK0nK+lpOObr+S7zd2ohrPz40KtgQIKKKCAAgqon4RSepKDA9Vn02O1DiBV63TzGFcxMz1yTO9f9V4v4z9JAlxUMiq/ejfRURf/JjqqC1B3kVFVgO4CGRWiGCSjtgGKQTLqGmDxJKNCNKzIqBA/S6Ci8sMCUd0SL1+QXy1TUccQ7SEqahti40dEJUF6VkTUV4AtHhkVpmFMRF2CNIyJqDTIaxEiKsyfK1TTpZM4BNMjuxAbl1G1zx7zy1H3XQ+PR+7jddb5K2SggAIKKKCAAgoooIACCiiggAIKKKCAAgoooIACCiiggPpJKL/vvL2gdp5H0vlAqcLz8D4fKGk9jzn0cvlyzwMhPaDGgZB+R2fSUbfRmV6HjBJR30NGfY5jpaH+jmP9DbFnKRrsgQaiAAAAAElFTkSuQmCC',
            },
            {
              label: 'Instagram',
              value: 'Instagram',
              image:
                'data:image/jpeg;base64,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',
            },
          ]"
          v-model="selected_option"
          placeholder="Select Social Media Platform"
        >
          <template #prefix> </template>
          <template #item-prefix="{ option }">
            <img :src="option.image.toString()" class="h-4 w-4 rounded-full" />
          </template>
        </Autocomplete>
      </div>
    </div>
    <div class="flex justify-between">
      <div
        class="w-[25%] my-auto"
        style="height: 2px; background-color: lightgray"
      ></div>
      <span>Your Selected Social Media Platforms</span>
      <div
        class="w-[25%] my-auto"
        style="height: 2px; background-color: lightgray"
      ></div>
    </div>
    <div>
      <div v-if="selected_list.length > 0" v-for="values in selected_list">
        {{ values }}
        <button @click="handle_remove_value(values)">remove</button>
      </div>
      <div v-else>
        <span>Selected Social Media Pages:</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
