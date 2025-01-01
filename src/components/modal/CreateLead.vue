<template>
  <div>
    <div class="p-1">
      <Button
        class="bg-dark"
        @click="dialog2 = true"
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
        <span class="text-bold">+</span>
        Create
      </Button>
    </div>

    <Dialog :options="{ size: '3xl' }"   v-model="dialog2">
      <template #body-title>
        <h1 class="font-semibold text-2xl">Create Lead</h1>
      </template>
      <template #body-content>
        <div class="flex justify-between">
     
          <div class="p-2 w-full">
            <span class="text-gray-500 font-medium text-sm my-1">Salutation</span>
          <Autocomplete

            class="w-[90%]"
            :options="[
              {
                label: 'John Doe',
                value: 'john-doe',
                image: 'https://randomuser.me/api/portraits/men/59.jpg',
              },
              {
                label: 'Jane Doe',
                value: 'jane-doe',
                image: 'https://randomuser.me/api/portraits/women/58.jpg',
              },
              {
                label: 'John Smith',
                value: 'john-smith',
                image: 'https://randomuser.me/api/portraits/men/59.jpg',
              },
              {
                label: 'Jane Smith',
                value: 'jane-smith',
                image: 'https://randomuser.me/api/portraits/women/59.jpg',
              },
              {
                label: 'John Wayne',
                value: 'john-wayne',
                image: 'https://randomuser.me/api/portraits/men/57.jpg',
              },
              {
                label: 'Jane Wayne',
                value: 'jane-wayne',
                image: 'https://randomuser.me/api/portraits/women/51.jpg',
              },
            ]"
            v-model="single"
            placeholder="Select person"
          />
        </div>
        <div class="p-2 w-full">
            <span class="text-gray-500 font-medium text-sm my-1" >First Name</span>
            <TextInput
             class="text-gray-500 font-medium text-sm my-1"
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
            />
          </div>
          <div class="p-2 w-full">
            <span class="text-gray-500 font-medium text-sm my-1">Last Name</span>
            <TextInput
            class="text-gray-500 font-medium text-sm my-1"
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
            />
          </div>
        </div>



        <div class="flex justify-between">
     
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Email</span>
     <Autocomplete
       :options="[
         {
           label: 'John Doe',
           value: 'john-doe',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Doe',
           value: 'jane-doe',
           image: 'https://randomuser.me/api/portraits/women/58.jpg',
         },
         {
           label: 'John Smith',
           value: 'john-smith',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Smith',
           value: 'jane-smith',
           image: 'https://randomuser.me/api/portraits/women/59.jpg',
         },
         {
           label: 'John Wayne',
           value: 'john-wayne',
           image: 'https://randomuser.me/api/portraits/men/57.jpg',
         },
         {
           label: 'Jane Wayne',
           value: 'jane-wayne',
           image: 'https://randomuser.me/api/portraits/women/51.jpg',
         },
       ]"
       v-model="single"
       placeholder="Select person"
     />
   </div>
   <div class="p-2 w-full">
    <span class="text-gray-500 font-medium text-sm my-1">Mobile No</span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Gender</span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
   </div>

   <hr class="my-3">

   <div class="flex justify-between">
     
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Organization</span>
     <Autocomplete
       :options="[
         {
           label: 'John Doe',
           value: 'john-doe',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Doe',
           value: 'jane-doe',
           image: 'https://randomuser.me/api/portraits/women/58.jpg',
         },
         {
           label: 'John Smith',
           value: 'john-smith',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Smith',
           value: 'jane-smith',
           image: 'https://randomuser.me/api/portraits/women/59.jpg',
         },
         {
           label: 'John Wayne',
           value: 'john-wayne',
           image: 'https://randomuser.me/api/portraits/men/57.jpg',
         },
         {
           label: 'Jane Wayne',
           value: 'jane-wayne',
           image: 'https://randomuser.me/api/portraits/women/51.jpg',
         },
       ]"
       v-model="single"
       placeholder="Select person"
     />
   </div>
   <div class="p-2 w-full">
    <span class="text-gray-500 font-medium text-sm my-1">Website</span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">No. of Employees  </span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
   </div>
   <div class="flex justify-between">
     
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Territory</span>
     <Autocomplete
       :options="[
         {
           label: 'John Doe',
           value: 'john-doe',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Doe',
           value: 'jane-doe',
           image: 'https://randomuser.me/api/portraits/women/58.jpg',
         },
         {
           label: 'John Smith',
           value: 'john-smith',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Smith',
           value: 'jane-smith',
           image: 'https://randomuser.me/api/portraits/women/59.jpg',
         },
         {
           label: 'John Wayne',
           value: 'john-wayne',
           image: 'https://randomuser.me/api/portraits/men/57.jpg',
         },
         {
           label: 'Jane Wayne',
           value: 'jane-wayne',
           image: 'https://randomuser.me/api/portraits/women/51.jpg',
         },
       ]"
       v-model="single"
       placeholder="Select person"
     />
   </div>
   <div class="p-2 w-full">
    <span class="text-gray-500 font-medium text-sm my-1">Annual Revenue
    </span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Industry</span>
       <TextInput
         :type="'text'"
         :ref_for="true"
         size="sm"
         variant="subtle"
         placeholder="Placeholder"
         :disabled="false"
         modelValue=""
       />
     </div>
   </div>
   <hr class="my-3">
   <div class="flex justify-between">
     
     <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Status </span>
     <Autocomplete
       :options="[
         {
           label: 'John Doe',
           value: 'john-doe',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Doe',
           value: 'jane-doe',
           image: 'https://randomuser.me/api/portraits/women/58.jpg',
         },
         {
           label: 'John Smith',
           value: 'john-smith',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Smith',
           value: 'jane-smith',
           image: 'https://randomuser.me/api/portraits/women/59.jpg',
         },
         {
           label: 'John Wayne',
           value: 'john-wayne',
           image: 'https://randomuser.me/api/portraits/men/57.jpg',
         },
         {
           label: 'Jane Wayne',
           value: 'jane-wayne',
           image: 'https://randomuser.me/api/portraits/women/51.jpg',
         },
       ]"
       v-model="single"
       placeholder="Select person"
     />
   </div>
   <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Lead Owner </span>
     <Autocomplete
       :options="[
         {
           label: 'John Doe',
           value: 'john-doe',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Doe',
           value: 'jane-doe',
           image: 'https://randomuser.me/api/portraits/women/58.jpg',
         },
         {
           label: 'John Smith',
           value: 'john-smith',
           image: 'https://randomuser.me/api/portraits/men/59.jpg',
         },
         {
           label: 'Jane Smith',
           value: 'jane-smith',
           image: 'https://randomuser.me/api/portraits/women/59.jpg',
         },
         {
           label: 'John Wayne',
           value: 'john-wayne',
           image: 'https://randomuser.me/api/portraits/men/57.jpg',
         },
         {
           label: 'Jane Wayne',
           value: 'jane-wayne',
           image: 'https://randomuser.me/api/portraits/women/51.jpg',
         },
       ]"
       v-model="single"
       placeholder="Select person"
     />
   </div>

   </div>
        
      </template>
      <template class="flex justify-end" #actions>
        <div class="flex justify-end">
          <Button class="" variant="solid"> create </Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { h, ref , watch } from "vue";
import { Button, Dialog, Autocomplete, TextInput } from "frappe-ui";
const dialog2 = ref(false);
const single = ref("");



</script>

<style scoped>
.create-lead-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-dialog {
  width: 43rem;
  max-width: 90%; /* Optional: Responsive design */
}
</style>
