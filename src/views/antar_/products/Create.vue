<script setup>
import { onMounted, ref } from "vue";
import {
  Button,
  Dialog,
  Autocomplete,
  TextInput,
  Switch,
  Checkbox,
  Textarea,

} from "frappe-ui";
import { create_product, create_images } from "@/api/userApi";
import Nav from "./nav/Nav.vue";
import Img from "./image/Img.vue";

import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const industry_list = ref([]);
const territory_list = ref([]);
const user_list = ref([]);
const checked = ref({
  organization: false,
  contact: false,
});
const address_list = ref([]);
const form_details = ref({
  salutation: null,
  first_name: null,
  last_name: null,
  email: null,
  mobile: null,
  gender: null,
  designation: null,
  company_name: null,
  address: null,
});
const product_details = ref({
  product_image: null,
  product_name: null,
  product_type: null,
  product_description: null,
  unit_price: null,
  unit_of_measure: null,
  currency: null,
  tax_rate: null,
  discountable: null,
  status: null,
});

const uploadedImages = ref(null); // New ref to store uploaded images

// Function to trigger file input click
const triggerFileInput = () => {
  const fileInput = document.querySelector(".file-input");
  if (fileInput) {
    fileInput.click();
  }
};

// Function to handle file selection
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  const res = await create_images(formData);
  if (res.statusCode == 200) {
    uploadedImages.value = res.data?.file;
    console.log(uploadedImages.value);
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

const handle_save = async () => {
  product_details.value.product_image = uploadedImages.value || "";


  if(product_details.value.tax_rate >= 10){
     return     toast.success('tax cannot be above 10%', {
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
  const res = await create_product(product_details.value);
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
const deleteImage = () => {
  uploadedImages.value = null;
};
</script>

<template>
  <Nav @save="handle_save"></Nav>
  <div class="p-4">
    <Img />
    <!-- <MultipleImg/> -->
    <!-- <header class="mx-6">Product Image</header> -->
    <!-- <div class="wrapper flex mx-6" @click="triggerFileInput">
      <form class="w-1/2 h-full" action="#">
        <input
          class="file-input"
          type="file"
          name="file"
          hidden
          multiple
          @change="handleFileChange"
        />
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Browse File to Upload</p>
      </form>

      <section
        v-if="uploadedImages != null"
        class="uploaded-area mx-4 py-6 relative"
      >
        <div class="flex border-2 relative">
          <img
            width="200"
            height="200"
            :src="uploadedImages"
            alt="Uploaded Image"
            class="uploaded-image"
          />
          <span>{{ image }}</span>
          <button
            @click="deleteImage"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </section>
    </div> -->


    
    <div class="mx-4">
      <hr />

      <div class="flex">
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >product Name</span
          >
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter product name"
            :disabled="false"
            :modelValue="product_details.product_name"
            v-model="product_details.product_name"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Product type</span
          >
          <Autocomplete
            :options="[
              {
                label: 'Product',
                value: 'product',
              },
              {
                label: 'Service',
                value: 'service',
              },
            ]"
            v-model="product_details.product_type"
            placeholder="Select product type"
          />
        </div>
      </div>

      <div class="flex justify-between">
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Currency</span>
          <Autocomplete
            :options="[
              {
                label: 'Rupees',
                value: 'rupees',
              },
              {
                label: 'dollar',
                value: 'dollar',
              },
              {
                label: 'usdt',
                value: 'usdt',
              },

            ]"
               v-model="product_details.currency"
            placeholder="Select currency"
          />
       
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Unit Price</span>
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'number'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter unit price"
            :disabled="false"
            :modelValue="product_details.unit_price"
            v-model="product_details.unit_price"
          />
        </div>
      </div>

      <div class="flex justify-between">
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Tax Rate in percentage (%) </span>
          <TextInput
            :type="'number'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter tax rate"
            :disabled="false"
            :modelValue="product_details.tax_rate"
            v-model="product_details.tax_rate"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Unite of Measure</span
          >
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'number'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter unit of measure"
            :disabled="false"
            :modelValue="product_details.unit_of_measure"
            v-model="product_details.unit_of_measure"
          />
        </div>
      </div>
      <div class="flex"></div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Description</span>
        <div class="p-1">
          <Textarea
            :variant="'subtle'"
            :ref_for="true"
            size="sm"
            placeholder="Enter description"
            :disabled="false"
            :modelValue="product_details.product_description"
            v-model="product_details.product_description"
          />
        </div>
      </div>
  
      <div class="">
        <div class="p-2">
    
          <div class="w-fit"> 
            <Switch
            size="sm"
            label="Product availability Status"
            description=""
            :disabled="false"
              v-model="product_details.status"
          />
          </div>

        </div>
      </div>
      <div class="">
        <div class="p-2">
       
          <div class="w-fit"> 
            <Switch
            size="sm"
           
            description=""
            :disabled="false"
             v-model="product_details.discountable"
            label="Product Discountable"
          />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ::selection {
  color: #fff;
  background: #4f5053;
}
.wrapper {
  width: 1000px;
  background: #fff;
  border-radius: 5px;
  padding: 0px;
}
.wrapper header {
  color: #58595c;
  font-size: 27px;
  font-weight: 600;
  text-align: center;
}
.wrapper form {
  height: 167px;
  display: flex;
  cursor: pointer;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #6b6b6b;
}
form :where(i, p) {
  color: #4d4d4d;
}
form i {
  font-size: 50px;
}
form p {
  margin-top: 15px;
  font-size: 16px;
}
section .row {
  margin-bottom: 0px;
  background: #e9f0ff;
  list-style: none;
  padding: 5px 0px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .row i {
  color: #6990f2;
  font-size: 30px;
}
section .details span {
  font-size: 14px;
}
.progress-area .row .content {
  width: 100%;
  margin-left: 15px;
}
.progress-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.progress-area .content .progress-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}
.content .progress-bar .progress {
  height: 100%;
  width: 0%;
  background: #6990f2;
  border-radius: inherit;
}
.uploaded-area {
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress {
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar {
  width: 0px;
}
.uploaded-area .row .content {
  display: flex;
  align-items: center;
}
.uploaded-area .row .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .row .details .size {
  color: #404040;
  font-size: 11px;
}
.uploaded-area i.fa-check {
  font-size: 16px;
} */
</style>
