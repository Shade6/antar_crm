<script setup>
import { ref, onMounted } from "vue";
import {
  Button,
  FeatherIcon,
  FileUploader,
  TextInput,
  Dialog,
} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import {
  // create_lead_attachment,
  // get_attachment_by_lead_id,
  // delete_lead_attachment
  create_basic_attachments,
  get_all_basic_attachments,
  update_basic_attachments,
  delete_basic_attachments,
  create_images
} from "@/api/userApi.js";
const switchStore = useSwitchStore();

import { useRoute } from "vue-router";
const route = useRoute(); // Get the current route
const lead_route_id = route.params.id;

const file_data = ref(null);
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const dialog2 = ref(false);
const Cred_status = ref(null);
const link_open = ref(true);

const file = ref(null);
const fetch = async () => {
  const res = await get_all_basic_attachments({lead_id:lead_route_id,opportunity_id:null});
  if (res.statusCode == 200) {
    array_list.value = res.data;
  } else {
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
};

const save_ = async () => {
  // if(file_data.value==null){

  const data = {
    lead_id: lead_route_id,
    title: file_data.value,
  };
  const res = await create_basic_attachments(data);
  if (res.statusCode == 200) {
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
    fetch();
    file_data.value = null;
    link_open.value = true;
    dialog2.value = false;
  } else {
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

  //   }else{
  //   const formData = new FormData();
  //   formData.append("file", file_data.value);

  //   const res = await create_lead_attachment(formData,lead_route_id);
  //   if (res.statusCode == 200) {
  //     fetch();
  //     file_data.value = null;
  //     link_open.value = true;
  //     dialog2.value = false;
  //     toast.success(res.message, {
  //       position: "top-right",
  //       duration: 3000,
  //       dismissible: true,
  //     });
  //   }else{
  //     toast.success(res.message, {
  //       position: "top-right",
  //       duration: 3000,
  //       dismissible: true,
  //     });
  //   } 
  // }
};

onMounted(fetch);
function getTimeDifference(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now - givenDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}
const handleFileChange = async(event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const res = await create_images(formData);
  if (res.statusCode == 200) {
    file_data.value = res.data?.file;
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
const delete_attachment = async(id)=>{

  const res = await delete_basic_attachments(id);
  if(res.statusCode==200){
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    }); 
    fetch();
  }else{
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
}
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Attachments </span>
    <div class="p-1">
      <Button @click="dialog2 = true"> Upload Attachment </Button>
      <Dialog v-model="dialog2">
        <template #body-title>
          <h3>Upload Attachment</h3>
        </template>
        <template #body-content>
          <div v-if="file_data==null">
            <div
              v-if="link_open"
              class="w-full h-2/3 flex justify-center items-center"
            >
              <input
                @change="handleFileChange"
                type="file"
                class="custom-file-input"
              />
              <Button
                class="mx-3"
                :variant="'subtle'"
                :ref_for="true"
                theme="gray"
                size="sm"
                label="Button"
                :loading="false"
                :loadingText="null"
                :disabled="false"
                :link="null"
                @click="link_open = false"
              >
                Link
              </Button>
            </div>
            <div class="my-6" v-else>
              <div class="p-2">
                <span>Enter link</span>
                <TextInput
                  :type="'text'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter the link"
                  :disabled="false"
                  modelValue=""
                  v-model="file_data"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center" v-else>
            <div class="flex flex-col justify-center items-center">
              <div>
      
              <!-- <span v-if="file_data">{{ file_data?.name }}</span> -->
               <img v-if="file_data" width="100" :src="file_data"/>
            </div>
            <Button @click="file_data = null">Remove file</Button>
            </div>
          
          </div>
        </template>
        <template #actions>
          <Button @click="save_" variant="solid"> Confirm </Button>
          <Button v-if="link_open" class="ml-2" @click="dialog2 = false">
            Close
          </Button>
          <Button v-else class="ml-2" @click="link_open = true"> back </Button>
        </template>
      </Dialog>
    </div>
  </div>

  <div v-if="Cred_status == null">
    <div class="text-center my-6" v-if="array_list.length == 0">
      <span class="text-gray-500">Attachments are found empty</span>
    </div>

    <div v-else>
      <div class="flex justify-between" v-for="image in array_list">
        <div>
          <img class="mx-2" width="50" height="50" :src="image.title" alt="" />
          <span>... {{image?.title?.slice(-20) ?? 'no image'  }}</span>
        </div>
        <div>
          <span>{{ getTimeDifference(image.created_at) }}</span>
          <br />
          <div class="flex gap-3">
            <div class="p-1">
              <Button
                @click="delete_attachment(image.attachment_id)"
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
                delete
              </Button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-file-input {
  width: 90px;
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Select  files";
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
