<script setup>
import { Button, ListView, TextInput ,FeatherIcon} from "frappe-ui";
import { defineEmits, onMounted, ref } from "vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import {create_industry,find_all_industry} from '@/api/userApi.js'
const toast = useToast();

const emit = defineEmits(["go_back"]);
const industry_name = ref("")
const industry_list = ref([])

const handle_back = () => {
  emit("go_back");
};
const create = ref(true);
const handle_create = () => {
  create.value = !create.value;
};
const handle_save_industry = async()=>{
 const res = await create_industry({industry_name:industry_name.value})
 if(res.statusCode == 200){
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
    create.value = true;
    industry_name.value = ""
    fetch_data()
 }else{
    toast.success(res.message, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
        style: {
          background: "#FFF5F5",
          color: "black",
          padding: "4px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid red",
        },
      });
 }
}
const fetch_data =async()=>{
  const res = await find_all_industry();
  if(res.statusCode == 200){
    industry_list.value = res.data.map((val, i) => ({
         ID: val.industry_id,
         name: val.industry_name,
      }));
  }else{
    toast.success(res.message, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
        style: {
          background: "#FFF5F5",
          color: "black",
          padding: "4px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid red",
        },
      });
  }
}
onMounted(fetch_data)
</script>

<template>
  <div class="p-6">
    <div class="p-1 flex justify-between">
      <div>
        <span class="mx-2 text-2xl font-semibold">Industry Management</span>
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
        <div class="p-1">
          <Button
            v-if="create"
            @click="handle_create"
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
            Create Industry
          </Button>
        </div>
      </div>
    </div>
    <div v-if="create">
      <ListView
        class="h-2/3 my-3"
        :columns="[
          {
            label: 'ID',
            key: 'ID',
            width: '550px',
            getLabel: ({ row }) => row.name,
            prefix: ({ row }) => {
              return h(Avatar, {
                shape: 'circle',
                image: row.user_image,
                size: 'sm',
              });
            },
          },
          {
            label: 'name',
            key: 'name',
          },
        ]"
        :rows="industry_list"
        :options="{
          selectable: true,
          showTooltip: true,
          resizeColumn: true,
          emptyState: {
            title: 'No records found',
            description: 'Create a new record to get started',
            button: {
              label: 'New Record',
              variant: 'solid',
            },
          },
        }"
        row-key="id"
      >
        <template #cell="{ item, row, column }">
          <span class="font-medium text-ink-gray-7">
            {{ item }}
          </span>
        </template>
      </ListView>
    </div>
    <div class="flex justify-center my-13" v-else>
      <div class="border shadow-sm p-7 rounded-md w-112">
        <div class="flex justify-center relative">
          <span class="text-center text-2xl font-bold">create Industry</span>
          <button class="absolute start-0 " @click="create=!create">
            <FeatherIcon name="arrow-left-circle"
            class="h-6 w-6" />
          </button>
        </div>
        <div>
          <div class="p-2 my-4">
            <span class="py-3 font-semibold text-gray-700">Industry Name</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="enter industry name"
              :disabled="false"
              modelValue=""
              v-model="industry_name"
            />
          </div>
          <div class="p-1 flex justify-center">
            <Button
               @click="handle_save_industry"
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
              Save Industry
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
