<script setup>
import { ref, onMounted, h } from "vue";
import { useRoute ,useRouter} from "vue-router";
import {
  get_single_opportunity,
  find_all_industry,
  find_all_territories,
  findAllUsers,
  get_all_contact,
  create_extra_contact,
  find_extra_contact,
  handle_remove_extra_contact
} from "@/api/userApi";
import { FeatherIcon, TextInput, Autocomplete, Dropdown } from "frappe-ui";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const route = useRoute();
const router = useRouter()
const opportunityId = route.params.id;
const opportunity = ref({});
const industry = ref([]);
const territory = ref([]);
const users = ref([]);

const opportunity_details = ref({
  opportunity_id: "",
  opportunity_name: "",
  opportunity_value: "",
  probability: "",
  status: "",
  opportunity_owner_id: "",
  created_at: "",
});

const contact_details = ref({
  contact_id: "",
  salutation: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  mobile: "",
  gender: "",
  company_name: "",
});

const organization_details = ref({
  organization_id: "",
  industry_id: "",
  territory_id: "",
  company: "",
  website: "",
  annual_revenue: "",
  no_of_employees: "",
  organization_name: "",
});
const side_bar = ref({
  contact: false,
  organization: false,
});

const contact_list = ref([])
const selected_contact_list = ref([])
const fetch = async () => {
  const res = await get_single_opportunity(opportunityId);
  if (res.statusCode === 200) {
    opportunity_details.value.opportunity_id = res.data?.opportunity_id || "";
    opportunity_details.value.opportunity_name =
      res.data?.opportunity_name || "";
    opportunity_details.value.opportunity_value =
      res.data?.opportunity_value || "";
    opportunity_details.value.probability = res.data?.probability || "";
    opportunity_details.value.status = res.data?.status || "";
    opportunity_details.value.opportunity_owner_id =
      res.data?.opportunity_owner_id || "";
    opportunity_details.value.created_at = res.data?.changed_on || "";

    organization_details.value.organization_id =
      res.data?.organization_id || "";
    organization_details.value.industry_id =
      res.data?.organization?.industry?.industry_id || "";
    organization_details.value.territory_id =
      res.data?.organization?.territory?.territory_id || "";
    organization_details.value.company = res.data?.organization?.company || "";
    organization_details.value.website = res.data?.organization?.website || "";
    organization_details.value.annual_revenue =
      res.data?.organization?.annual_revenue || "";
    organization_details.value.no_of_employees =
      res.data?.organization?.no_of_employees || "";
    organization_details.value.organization_name =
      res.data?.organization?.organization_name || "";

    contact_details.value.contact_id = res.data?.contact_id;
    contact_details.value.salutation = res.data?.contact?.salutation || "";
    contact_details.value.first_name = res.data?.contact?.first_name || "";
    contact_details.value.last_name = res.data?.contact?.last_name || "";
    contact_details.value.email = res.data?.contact?.email_id || "";
    contact_details.value.phone = res.data?.contact?.phone || "";
    contact_details.value.mobile = res.data?.contact?.phone || "";
    contact_details.value.gender = res.data?.contact?.gender || "";
    contact_details.value.company_name = res.data?.contact?.company_name || "";

    opportunity.value = res.data;
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

    const res_2 = await find_extra_contact(res.data?.opportunity_id)
    if(res_2.statusCode == 200){
      selected_contact_list.value = res_2.data
    }
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
const fetch_territory = async () => {
  const res = await find_all_territories();
  if (res.statusCode == 200) {
    territory.value = res.data.map((val, i) => ({
      label: val.territory_name,
      value: val.territory_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const fetch_industry = async () => {
  const res = await find_all_industry();
  if (res.statusCode == 200) {
    industry.value = res.data.map((val, i) => ({
      label: val.industry_name,
      value: val.industry_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const fetch_users = async () => {
  const res = await findAllUsers();
  if (res.statusCode == 200) {
    users.value = res.data.map((val, i) => ({
      label: val?.first_name + " " + val?.last_name,
      value: val.user_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const handle_new_contact = async(data)=>{
  const details = {
    contact_id:data,
    opportunity_id:opportunity_details.value.opportunity_id 
  }
const res = await create_extra_contact(details)
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
const fetch_contacts = async()=>{
  const res = await get_all_contact()
  if(res.statusCode == 200){
    contact_list.value = res.data.map((val)=>({
      label:val.first_name+ " " + val.last_name,
      value:val.contact_id,
      onClick: () => {
        handle_new_contact(val.contact_id)
      },
    }))
  }
}

const handle_remove_extra = async(data)=>{
  const res = await handle_remove_extra_contact(data)
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
onMounted(() => {
  fetch();
  fetch_territory();
  fetch_industry();
  fetch_users();
  fetch_contacts()
});
</script>

<template>
  <div class="w-full flex justify-center items-center border-b-2 pb-3">
    <span class="text-gray-700 text-center text-2xl">OPN 1234567890</span>
  </div>
  <div class="w-full flex justify-center border-b-2 pb-3 items-center">
    <span class="text-gray-700 text-center text-2xl">{{ opportunityId }}</span>
  </div>
  <div class="h-[80%] overflow-y-scroll">
    <div>
      <div class="flex justify-between items-center py-5">
        <button @click="side_bar.contact = !side_bar.contact">
          <span
            >
            {{ contact_details.first_name }} {{ contact_details.last_name }}
            <span  class="px-2 bg-green-400 rounded-md">Primary </span>
          </span>
        </button>
        <button @click="router.push(`/antar_/contacts/${contact_details.contact_id}`)">
            <FeatherIcon class="w-4 h-4" name="arrow-up-right" />
        </button>
        <Dropdown
        :options="[
          {
            group: '',
            items:contact_list.filter((val)=>val.value !==contact_details.contact_id ),
        
          },
      
        ]"
      >
        <Button class="mx-2 hover:bg-gray-300 px-2 rounded-sm my-auto">
          <div class="flex gap-2">
            <div class="my-auto">
              <ListIcon />
            </div>
            <div>
              <span class="">
                <FeatherIcon class="w-5" name="plus"/>
              </span>
            </div>
          </div>
        </Button>
      </Dropdown>
      </div>
      <div class="w-full" v-if="selected_contact_list.length !=0">
        
        <div class="my-2 py-2 border-t-2" v-for="contact_value in selected_contact_list ">
            <span>{{ contact_value?.contact?.first_name+" "+ contact_value?.contact?.last_name}}<span class="mx-2 px-2 bg-blue-300 rounded-md">added</span>  </span>
            <button @click="router.push(`/antar_/contacts/${contact_value.contact_id}`)">
                <FeatherIcon class="w-4 h-4" name="arrow-up-right" />
            </button>
            <button @click="handle_remove_extra(contact_value.contact_mapping_id)" class="text-xs bg-red-400 px-2 py-1 rounded-md ml-12">Remove</button>
          </div>
      </div>
    
      <div v-if="false">
        <span class="py-1 mx-2 text-gray-700">salutation</span>

        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.salutation"
            v-model="contact_details.salutation"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">first name</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.first_name"
            v-model="contact_details.first_name"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">last name</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.last_name"
            v-model="contact_details.last_name"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">email</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.email"
            v-model="contact_details.email"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">phone</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.phone"
            v-model="contact_details.phone"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">mobile</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="contact_details.mobile"
            v-model="contact_details.mobile"
          />
        </div>
      </div>
      <hr />
      <hr />
    </div>

    <div class="">
      <div
        class="flex justify-between items-center py-5"
        @click="side_bar.organization = !side_bar.organization"
      >
        <span>{{ organization_details.organization_name }}</span>
      </div>
      <div v-if="side_bar.organization">
        <span class="py-1 mx-2 text-gray-700">organization name</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="organization_details.organization_name"
            v-model="organization_details.organization_name"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">annual revenue</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="organization_details.annual_revenue"
            v-model="organization_details.annual_revenue"
          />
        </div>
        <span class="py-1 mx-2 text-gray-700">website</span>
        <div class="p-2">
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Placeholder"
            :disabled="false"
            :modelValue="organization_details.website"
            v-model="organization_details.website"
          />
        </div>

        <div class="p-2">
          <span class="py-1 mx-2 text-gray-700">territory</span>
          <Autocomplete
            :options="territory"
            v-model="organization_details.territory_id"
            placeholder="Select territory"
          />
        </div>

        <div class="p-2">
          <span class="py-1 mx-2 text-gray-700">industry</span>
          <Autocomplete
            :options="industry"
            v-model="organization_details.industry_id"
            placeholder="Select industry"
          />
        </div>

        <div class="p-2">
          <span class="py-1 mx-2 text-gray-700">opportunity owner</span>
          <Autocomplete
            :options="users"
            v-model="organization_details.opportunity_owner_id"
            placeholder="Select opportunity owner"
          />
        </div>
      </div>
    </div>
    <hr />
    <hr class="mb-5" />
    <span class="py-1 mx-2 text-gray-700">opportunity name</span>
    <div class="p-2">
      <TextInput
        :type="'text'"
        :ref_for="true"
        size="sm"
        variant="subtle"
        placeholder="Placeholder"
        :disabled="false"
        :modelValue="opportunity_details.opportunity_name"
        v-model="opportunity_details.opportunity_name"
      />
    </div>
    <span class="py-1 mx-2 text-gray-700">opportunity value</span>
    <div class="p-2">
      <TextInput
        :type="'text'"
        :ref_for="true"
        size="sm"
        variant="subtle"
        placeholder="Placeholder"
        :disabled="false"
        :modelValue="opportunity_details.opportunity_value"
        v-model="opportunity_details.opportunity_value"
      />
    </div>
    <span
      >Created at
      {{ new Date(opportunity_details.created_at).toLocaleDateString() }}</span
    >
  </div>
</template>

<style scoped>
* {
  font-family: sans-serif;
}
</style>
