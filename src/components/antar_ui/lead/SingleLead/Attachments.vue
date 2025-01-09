<script setup>
import { ref, onMounted } from "vue";
import { Button, FeatherIcon, FileUploader ,TextInput} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import {
  create_lead_attachment,
  get_attachment_by_lead_id,
} from "@/api/userApi.js";
const switchStore = useSwitchStore();

import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);

const Cred_status = ref(null);
const link_open = ref(true)

const file = ref(null)
const fetch = async () => {
  const res = await get_attachment_by_lead_id(switchStore.create_form);
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
  const data = {
    lead_id:switchStore.create_form,
    title:file.value
  };
  const res = await create_lead_attachment(data);
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
    file.value = null;
    link_open.value = true;
    Cred_status.value = null
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
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Attachments </span>
    <div class="p-1">
      <Button
        v-if="Cred_status == null"
        style="width: 200px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="Cred_status = 'create'"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="plus" /> <span>Upload Attachment</span>
        </div>
      </Button>
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
          <span>{{ image.title }}</span>
        </div>
        <div>
          <span>{{ getTimeDifference(image.created_at) }}</span>
          <br />
          <div class="flex gap-3">
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
                delete
              </Button>
            </div>
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
                edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full" v-else>
    <div class="w-[500px] h-[300px] border rounded-lg mx-auto p-5">
      <div>
        <span>Create Attachments</span>
      </div>

      <div v-if="link_open" class="w-full h-2/3 flex justify-center items-center">
        <FileUploader
          :fileTypes="['image/*']"
          :validateFile="(fileObject) => {}"
          @success="(file) => {}"
        >
          <template
            #default="{
              file,
              uploading,
              progress,
              uploaded,
              message,
              error,
              total,
              success,
              openFileSelector,
            }"
          >
            <Button
              @click="openFileSelector.toString()"
              :loading="uploading.toString()"
            >
              Uploading {{ progress }}%
            </Button>
          </template>
        </FileUploader>
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
            v-model="file"
          />
        </div>
      </div>
      <div class="flex justify-center my-5">
        <div class="p-1">
          <Button
            :variant="'solid'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="save_"
          >
            Attachment And Create
          </Button>
        </div>
        <div class="p-1">
          <Button
            v-if="link_open"
            :variant="'subtle'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="Cred_status = null"
          >
            Close
          </Button>
          <Button
            v-else
            :variant="'subtle'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="link_open = true"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
