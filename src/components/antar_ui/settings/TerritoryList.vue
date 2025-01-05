<script setup>
import { Button ,ListView,Tree} from "frappe-ui";
import {defineEmits} from "vue"
const emit  = defineEmits(['go_back'])
const handle_back = ()=>{
  emit('go_back')
}
</script>

<template>
  <div class="p-8">
    <div class="">
      <span class="mx-2 text-2xl font-semibold">Territory management</span>
      <Button
       @click="handle_back"
        :variant="'outline'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        Go Back
      </Button>
    </div>
     <div>
        <Tree
  :options="{
    showIndentationGuides: true,
    rowHeight: '25px',
    indentWidth: '15px',
  }"
  nodeKey="name"
  :node="{
    name: 'guest',
    label: 'Guest',
    children: [
      {
        name: 'downloads',
        label: 'Downloads',
        children: [
          {
            name: 'download.zip',
            label: 'download.zip',
            children: [
              {
                name: 'image.png',
                label: 'image.png',
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'documents',
        label: 'Documents',
        children: [
          {
            name: 'somefile.txt',
            label: 'somefile.txt',
            children: [],
          },
          {
            name: 'somefile.pdf',
            label: 'somefile.pdf',
            children: [],
          },
        ],
      },
    ],
  }"
/>
     </div>
  </div>
</template>

<style scoped></style>
