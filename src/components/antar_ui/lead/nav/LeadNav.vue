<script setup>
import { h, ref, watch, defineEmits } from "vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import {
  Breadcrumbs,
  TextInput,
  FeatherIcon,
  Dropdown,
  Button,
  Popover,
  Autocomplete,
  TabButtons
} from "frappe-ui";
const emit = defineEmits(["search", "refresh"]);
const filter = ref({
  field:null,
  type:null,
  text:null
})

const sort = ref({
  field:null,
  sort_order:null
})
const search = ref("");

const handle_refresh = () => {
  emit("refresh");
};
watch(
  () => search.value,
  (newValue) => {
    emit("search", {text:newValue,type:{value:"like"},field:{value:"lead_id"}});
  }
);
watch(()=>sort.value.field,(newValue)=>{
  sort.value.sort_order = null
})
watch(()=>sort.value.sort_order,(newValue)=>{
  if(sort.value.field==null){
    toast.success('please select sorting field', {
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
  if(sort.value.sort_order==null){
    return
  }

  emit('sort',sort.value)
})

watch(()=>filter.value.text,(newValue)=>{
  if(filter.value.field==null){
    toast.success('please select filter field', {
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
    return
  }
  if(filter.value.type==null){
    toast.success('please select filter type', {
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
    return
  }
  emit('filter',filter.value)
})
</script>

<template>
  <div
    class="flex justify-between px-4"
    style="border-bottom: solid 1px #e5e4e2"
  >
    <div class="p-2 max-w-52">
      <TextInput v-model="search" placeholder="Search By Name" type="text">
        <template #prefix>
          <FeatherIcon class="w-4" name="search" />
        </template>
      </TextInput>
    </div>

    <div class="flex justify-center items-center pr-7">
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
          @click="handle_refresh"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-refresh-cw"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </Button>
      </div>
      <div class="p-1">
        <Popover>
          <template #target="{ togglePopover }">
            <Button @click="togglePopover()"> Filter </Button>
          </template>
          <template class="mt-3 w-72" #body-main>
            <div class="p-2 text-ink-gray-9 mt-3">
              <div class="p-2">
                <span class="text-sm font-semibold text-gray-700"
                  >Select Field</span
                >
                <Autocomplete
                  :options="[
                    {
                      label: 'Name',
                      value: 'first_name',
                    },
                    {
                      label: 'Email',
                      value: 'email',
                    },

                    {
                      label: 'Phone',
                      value: 'contact',
                    },
                    {
                      label: 'Company',
                      value: 'company',
                    },
                    {
                      label: 'Status',
                      value: 'status',
                    },
                    {
                      label: 'Created at',
                      value: 'created_at',
                    },
                  ]"
                  v-model="filter.field"
                  placeholder="Select person"
                />
              </div>
              <div class="p-2">
                <span class="text-sm font-semibold text-gray-700"
                  >Select Type</span
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
                  v-model="filter.type"
                  placeholder="Select person"
                />
              </div>
              <div class="p-2">
                <span class="text-sm font-semibold text-gray-700"
                  >Enter Your Text</span
                >
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="filter.text"
                    v-model="filter.text"
                  />
                </div>
              </div>
            </div>
          </template>
        </Popover>
      </div>
      <div class="p-1">
        <Popover>
          <template #target="{ togglePopover }">
            <Button @click="togglePopover()"> Sort </Button>
          </template>
          <template #body-main>
            <div class="p-2">
                <span class="text-sm font-semibold text-gray-700"
                  >Select Field</span
                >
                <Autocomplete
                  :options="[
                    {
                      label: 'Name',
                      value: 'name',
                    },
                    {
                      label: 'Email',
                      value: 'email',
                    },

                    {
                      label: 'Phone',
                      value: 'mobile',
                    },
                    {
                      label: 'Company',
                      value: 'organization',
                    },
                    {
                      label: 'Status',
                      value: 'status',
                    },
                    {
                      label: 'modified at',
                      value: 'modified',
                    },
                  ]"
                  v-model="sort.field"
                  placeholder="Select person"
                />
              </div>
              <div class="flex px-3 pb-4 justify-center">
              <TabButtons
                :buttons="[
                  {
                    label: 'A-Z',
                    value: 'asc',
                  },
                  {
                    label: 'Z-A',
                    value: 'desc',
                  },
                ]"
                v-model="sort.sort_order"
              />
            </div>
          </template>
        </Popover>
      </div>

      <!-- <Dropdown
        :options="[
          {
            group: 'Manage',
            items: [
              {
                label: 'Edit Title',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Manage Members',
                icon: () => h(FeatherIcon, { name: 'users' }),
              },
            ],
          },
          {
            group: 'Delete',
            items: [
              {
                label: 'Delete users',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Delete this project',
                icon: () => h(FeatherIcon, { name: 'trash' }),
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
      </Dropdown> -->
    </div>
  </div>
</template>

<style scoped></style>
