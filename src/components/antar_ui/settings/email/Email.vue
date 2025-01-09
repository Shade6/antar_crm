<script setup>
import { defineEmits, onMounted, ref ,h} from "vue";
import { Button, FeatherIcon, ListView, TextInput } from "frappe-ui";
import { useRouter } from "vue-router";
const router = useRouter();
import {create_email,find_all_email} from '@/api/userApi.js'
import EmailHandler from  "@/components/antar_ui/settings/email/EmailHandler.vue"
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const emit = defineEmits(["go_back"]);
const table_data = ref([]);
const action = ref(null);
const email_name = ref('')
const handle_save =async()=>{
    const res = await create_email({email:email_name.value})
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
    fetch()
    email_name.value = '';
    action.value = null
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
const handle_edit = (id) => {
  const selectedEmail = table_data.value.find((item) => item.id === id);
  if (selectedEmail) {
    email_name.value = selectedEmail.email;
    action.value = 'edit';
  }
};

const handle_delete = async (id) => {
  const res = await delete_email(id); // Replace with your actual delete API function
  if (res.statusCode === 200) {
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
    fetch(); // Refresh the table data
  } else {
    toast.error(res.message, {
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
};

const fetch=async()=>{
   email_name.value = "" 
    const res = await find_all_email()
    if(res.statusCode == 200){
        table_data.value = res.data.map((val,i)=>({
          id:i+1,
          email:val.email,
      
        }))
        console.log(table_data.value,'-----')
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

const handle_create_email = ()=>{
  action.value = 'create'
  router.push('#'+'details')
}

onMounted(fetch)
</script>

<template>
  <div class="flex justify-between p-5" style="border-bottom: solid 1px #E5E4E2;">
    <div class="flex " >
      <div class="p-1">
        <Button
          @click="emit('go_back')"
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
          <FeatherIcon class="w-5" name="chevron-left" />
        </Button>
      </div>
      <span class="text-2xl font-medium my-auto">Email Management</span>
    </div>

    <div class="p-1">
      <Button
        v-if="action == null"
        @click="handle_create_email"
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
        Create Email
      </Button>
     
    </div>
  </div>
  <div v-if="action == null">
    <div class="p-5">
      <ListView
        class="h-[250px]"
        :columns="[
          {
            label: 'id',
            key: 'id',
          },
          {
            label: 'Email',
            key: 'email',
            width: '200px',
          },
          {
            label: 'action',
            key: 'action',
          },
        ]"
        :rows="table_data"
        :rowRenderer="(row) => [
          h(Button, { size: 'xs', variant: 'subtle', onClick: () => handle_edit(row.action) }, () => 'Edit'),
          h(Button, { size: 'xs', variant: 'subtle', theme: 'red', onClick: () => handle_delete(row.action.id) }, () => 'Delete')
        ]"
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
              onClick: () => console.log('New Record'),
            },
          },
        }"
        row-key="id"
      />
    </div>
  </div>
  <div  v-else>
     <EmailHandler />
  </div>
</template>

<style scoped></style>
