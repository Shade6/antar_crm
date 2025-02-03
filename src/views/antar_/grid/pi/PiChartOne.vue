<script setup >
import { defineProps, watch, ref, onMounted } from "vue";
const props = defineProps({
  total: {
    type: Object,
    required: true,
  },
});
const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
</script>


<template>
 <div class="border  h-[100%] w-[100%] p-3">
        <span class="font-bold"><u>Activity Table</u> </span>
     

<div class="relative ">
    <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                     type
                </th>
                <th scope="col" class="px-6 py-3">
                    for
                </th>
             
                <th scope="col" class="px-6 py-3">
                    time
                </th>
                <th scope="col" class="px-6 py-3">
                    person
                </th>
            </tr>
        </thead>
        <tbody  class="h-72 overflow-y-scroll">
            <tr v-for="test in props?.total?.activity_table" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{ test?.type }}
                </th>
                
                <td class="px-6 py-4">
                    
                    {{ test?.task_status}}

                </td>
              
                <td 
                    class="px-6 py-4"
                    :class="{ 'bg-red-500 text-white': isToday(test?.task_date) }"
                    >
                    {{ new Date(test?.task_date).toLocaleDateString('en-GB')  }}
                    {{ isToday(test?.task_date) ?' today' :''  }}
                    </td>

                <td class="px-6 py-4">
                    {{ test?.user?.first_name }}
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

    </div>
</template>

<style scoped>

</style>