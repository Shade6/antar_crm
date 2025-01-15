<script setup>
import { ref, onMounted, h } from "vue";
import { Button, FeatherIcon, Dropdown } from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import {
  get_lead_comment_by_lead_id,
  create_lead_comment,
  delete_lead_comment,
  update_lead_comment,
} from "@/api/userApi.js";
const switchStore = useSwitchStore();

import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const Cred_status = ref(null);
const comment = ref("");
const comment_id = ref(null);
const fetch = async () => {
  const res = await get_lead_comment_by_lead_id(switchStore.create_form);
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
    comment: comment.value,
    lead_id: switchStore.create_form,
  };
  const res = await create_lead_comment(data);
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
    comment.value = "";
    fetch();
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
const edit_comment = async (comment) => {

    comment.value = comment.comment;
  comment_id.value = comment.lead_comment_id;

  Cred_status.value = "create";
};
const delete_comment = async (id) => {
  const res = await delete_lead_comment(id);
  if (res.statusCode == 200) {
    fetch()
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
};
const update_comment = async () => {
  const data = {
    comment: comment.value,
    comment_id: comment_id.value,
  };
  const res = await update_lead_comment(data);
  if (res.statusCode == 200) {
    comment_id.value = null
    Cred_status.value = null
    comment.value = ""
    fetch()
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
};
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Comments </span>
    <div class="p-1">
      <Button
        v-if="Cred_status == null"
        style="width: 150px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="()=>{Cred_status = 'create';comment_id.value=null}"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="plus" /> <span>New Comment</span>
        </div>
      </Button>
    </div>
  </div>
  <div
    v-if="array_list.length == 0"
    class="p-3 flex justify-center items-center"
  >
    <div class="flex flex-col items-center">
      <FeatherIcon class="w-14" name="mail" />
      <span>No Comments</span>
      <div class="p-1">
        <Button
          @click="Cred_status = 'create'"
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
          New Comment
        </Button>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="my-3" v-for="comment in array_list" :key="comment.comment_id">
      <div class="flex justify-between">
        <div>
          <span class="bg-gray-100 rounded-full px-3 py-2 mr-3">{{
            comment.user.first_name[0]
          }}</span>
          <span class="text-gray-500">{{
            comment.user.first_name +
            " " +
            comment.user.last_name +
            " added a comment"
          }}</span>
        </div>
        <div>
          <span class="text-gray-500">{{
            getTimeDifference(comment.created_at)
          }}</span>
        </div>
      </div>

      <div
        class="bg-gray-50 p-3 ml-6 mt-4 flex justify-between rounded-sm shadow-sm"
      >
        <p class="text-gray-700">{{ comment.comment }}</p>
        <Dropdown
          :options="[
            {
              group: 'Manage',
              items: [
                {
                  label: 'Edit comment',
                  icon: () => h(FeatherIcon, { name: 'edit' }),
                  onClick: () => {
                 
                    edit_comment(comment);
                  },
                },
                {
                  label: 'Delete comment',
                  icon: () => h(FeatherIcon, { name: 'trash' }),
                  onClick: () => {
                    delete_comment(comment.lead_comment_id);
                  },
                },
              ],
            },
          ]"
        >
          <Button>
            <template #icon>
              <FeatherIcon name="more-horizontal" class="h-4 w-4" />
            </template>
          </Button>
        </Dropdown>
      </div>
    </div>
  </div>

  <div
    class="w-full"
    style="border-bottom: solid 1px #e5e4e2; border-top: solid 1px #e5e4e2"
    v-if="Cred_status == 'create'"
  >
    <div class="w-full" style="border-bottom: solid 1px #e5e4e2">
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
          <div class="flex">
            <FeatherIcon class="w-4 mx-2" name="message-circle" />
            <span> Comment </span>
          </div>
        </Button>
      </div>
    </div>
    <div>
      <textarea
        id="body"
        class="w-full h-64 text-gray-700 border-none focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder="Message..."
        :modelValue="comment"
        v-model="comment"
      ></textarea>
    </div>
    <div class="flex gap-3 justify-end">
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
          @click="Cred_status = null"
        >
          Discard
        </Button>
      </div>
      <div class="p-1">
        <Button
          v-if="comment_id == null"
          :variant="'subtle'"
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
          Comment
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
          @click="update_comment"
        >
          Update
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
