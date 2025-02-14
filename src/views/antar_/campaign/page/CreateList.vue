<script setup>
import Nav from "../nav/Nav.vue";
import { ref, onMounted, watch } from "vue";
import {
  Button,
  TextInput,
  Card,
  Autocomplete,
  Dialog,
  FeatherIcon,
} from "frappe-ui";
import {
  findAllUsers,
  createCampaignList,
  get_all_contact,
  contact_filter,
} from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const list_name = ref("");
const user_id = ref("");
const isLoading = ref(false);
const user_list = ref([]);
const dialog2 = ref(false);
const contact_select_list = ref([]);
const selected_contact = ref([]);
const filter_list = ref({
  filter_name: null,
  filter_type: null,
  search: null,
});

const submitForm = async () => {
  if (!list_name.value || !user_id.value) {
    return;
  }

  try {
    isLoading.value = true;
    const response = await fetch("/api/v1/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        list_name: list_name.value,
        user_id: user_id.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to create list");

    list_name.value = "";
    user_id.value = "";
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const fetch = async () => {
  const res = await get_all_contact();
  if (res.statusCode == 200) {
    contact_select_list.value = res.data.map((val) => ({
      label: val.first_name + " " + val.last_name,
      value: val.contact_id,
    }));
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
const handle_create = async () => {
  const res = await createCampaignList({
    list_name: list_name.value,
    user_id: user_id.value,
  });
  if (res.statusCode == 200) {
    list_name.value = "";
    user_id.value = "";
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
const handle_create_list = async() => {
const res = await createCampaignList({
    list_name: list_name.value,
    contact_list:selected_contact.value
})
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
const handle_filter = async (val) => {
  const res = await contact_filter({
    type: { value: filter_list.value.filter_type.value },
    field: { value: filter_list.value.filter_name.value },
    text: val,
  });
  if (res.statusCode != 200) {
    return toast.success(res.message, {
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
  contact_select_list.value = res.data.map((val) => ({
    label: val.first_name + " " + val.last_name,
    value: val.contact_id,
  }));
};
watch(
  () => filter_list.value.search,
  async (value) => {
    handle_filter(value);
  }
);
const handle_select_contact = (data) => {
  selected_contact.value.push(data);
};
const handle_remove = (data) => {
  const find_index = selected_contact.value.findIndex(
    (val) => val.value == data
  );
  selected_contact.value.splice(find_index, 1);
};
onMounted(fetch);
</script>

<template>
  <Nav @create_campaign_list="handle_create_list" />
  <div class="p-4">
    <div class="form-group">
      <label
        for="listName"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        List Name
      </label>
      <TextInput
        id="listName"
        v-model="list_name"
        type="text"
        class="w-full"
        placeholder="Enter list name"
      />
    </div>

    <div class="form-group">
      <label for="userId" class="block text-sm font-medium text-gray-700 mb-1">
        Select User
      </label>
      <div class="flex justify-start flex-wrap gap-2 my-3">
        <div class="" v-for="select in selected_contact">
          <span class="px-3 py-1 border rounded-sm flex bg-blue-100"
            >{{ select.label }}
            <button @click="handle_remove(select.value)" class="mx-2 my-auto">
              <FeatherIcon class="w-5 h-5 text-red-600 shadow-md rounded-full " name="x-circle" />
            </button>
          </span>
        </div>
      </div>

      <div class="p-2">
        <Button  @click="dialog2 = true">
            <div class="flex">
                <FeatherIcon class="w-4 h-4 mr-2" name="plus-circle" /> <span>Select Contacts </span> 
            </div>
           </Button>
        <Dialog
          v-model="dialog2"
          :options="{ size: 'xl' }"
          :prevent-close="true"
        >
          <template #body-title>
            <h3>
              Select Contact from ({{ contact_select_list?.length || "0" }})
            </h3>
          </template>
          <template #body-content>
            <div>
              <div class="flex">
                <div class="p-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Filter Field</span
                  >
                  <Autocomplete
                    :options="[
                      {
                        label: 'Name',
                        value: 'first_name',
                      },
                      {
                        label: 'Email',
                        value: 'email_id',
                      },

                      {
                        label: 'Phone',
                        value: 'phone',
                      },
                      {
                        label: 'Organization',
                        value: 'organization',
                      },
                      {
                        label: 'Created at',
                        value: 'created_on',
                      },
                    ]"
                    v-model="filter_list.filter_name"
                    placeholder="Select person"
                  />
                </div>
                <div class="p-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Filter Type</span
                  >
                  <Autocomplete
                    :options="[
                      {
                        label: 'Like',
                        value: 'like',
                      },
                      {
                        label: 'Equal',
                        value: 'eq',
                      },
                      {
                        label: 'Not Equal',
                        value: 'ne',
                      },
                    ]"
                    v-model="filter_list.filter_type"
                    placeholder="Select person"
                  />
                </div>
                <div class="p-2 max-w-52">
                  <span class="text-sm font-semibold text-gray-700"
                    >Search Based On Filter</span
                  >
                  <TextInput
                    v-model="filter_list.search"
                    placeholder="Search "
                    type="text"
                  >
                    <template #prefix>
                      <FeatherIcon class="w-4" name="search" />
                    </template>
                  </TextInput>
                </div>
              </div>

              <div>
                <div class="h-[250px] overflow-y-scroll">
                  <div
                    class="p-2 border flex justify-between my-2 bg-gray-50"
                    v-for="data in contact_select_list"
                  >
                    <span class="my-auto">{{ data.label }}</span>
                    <div class="p-1">
                      <Button
                        v-if="
                          !selected_contact.some(
                            (val) => val.value == data.value
                          )
                        "
                        :variant="'outline'"
                        :ref_for="true"
                        theme="gray"
                        size="sm"
                        label="Button"
                        :loading="false"
                        :loadingText="null"
                        :disabled="false"
                        :link="null"
                        @click="handle_select_contact(data)"
                      >
                        <FeatherIcon class="w-4 h-4" name="plus-circle" />
                      </Button>
                      <div class="flex" v-else>
                        <div
                          class="icon-animated icon-animated-tick"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <svg
                            class="circle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                          >
                            <circle cx="50" cy="50" r="50" />
                          </svg>

                          <div class="tick">
                            <svg
                              class="tick-leg1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 25 52"
                            >
                              <polygon
                                class=""
                                points="1,41 0,48 25,52 25,45"
                              />
                            </svg>
                            <svg
                              class="tick-leg2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 25 52"
                            >
                              <polygon
                                class=""
                                points="18,45 25,47 25,0 18,0"
                              />
                            </svg>
                          </div>
                        </div>
                        <button @click="handle_remove(data.value)" class="mx-2">
                          <FeatherIcon
                            class="w-5 h-5 my-auto"
                            name="x-circle"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #actions>
            <Button variant="solid"> Confirm </Button>
            <Button class="ml-2" @click="dialog2 = false"> Close </Button>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.icon-animated {
  width: 30px;
  height: 30px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

.icon-animated .tick svg {
  position: absolute;
  left: 12px;
  right: 0;
  top: 10px;
  bottom: 10;
  fill: #fff;
  width: 15px;
  height: 22px;
}

.icon-animated-tick .circle {
  fill: #60d154;
  animation-fill-mode: forwards;
  animation-name: circle-pulse;
  animation-duration: 4s;
  animation-iteration-count: 1;
}

.tick-leg1 {
  fill: #fff;
  animation-fill-mode: forwards;
  animation-name: tick-swipe1;
  animation-duration: 1s;
  animation-iteration-count: 1;
  transform: scaleX(0);
  transform-origin: left bottom;
  opacity: 0;
}

.tick-leg2 {
  fill: #fff;
  animation-fill-mode: forwards;
  animation-name: tick-swipe2;
  animation-duration: 2s;
  animation-iteration-count: 1;
  transform: scaleY(0);
  transform-origin: right bottom;
  opacity: 0;
}

@keyframes tick-swipe1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes tick-swipe2 {
  40% {
    opacity: 0;
  }
  47% {
    transform: scaleY(0.15);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes circle-pulse {
  0%,
  25%,
  75%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.tick {
  width: 40%;
  height: 150%;
  transform: rotate(45deg) scale(0.8);
  position: absolute;
  left: 0;
  top: 10;
  bottom: 0;
  right: 0;
}

.tick-holder {
  transform: scale(0.6);
}
</style>
