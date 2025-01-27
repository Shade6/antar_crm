<script setup>
import { onMounted, ref } from "vue";
import Nav from "./nav/Nav.vue";
import { get_single_product } from "@/api/userApi";
import "@/assets/toast.css";
import { useRoute, useRouter } from "vue-router";
import { Button, FeatherIcon } from "frappe-ui";
const route = useRoute(); // Get the current route
const router = useRouter();
import { useToast } from "vue-toast-notification";
const toast = useToast();
const product_details = ref({});
const product_id = route.params.id;
const fetch = async () => {
  const res = await get_single_product(product_id);
  if (res.statusCode == 200) {
    product_details.value = res.data;
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
const handle_view_opportunity = (data) => {
  router.push(`/antar_/opportunities/${data}`);
};
const handle_edit = (data)=>{
    router.push(`/antar_/product-services/edit#${data}`);
}
onMounted(fetch);
</script>

<template>
  <Nav></Nav>

  <div class="p-4">
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
        @click="handle_edit(product_details?.product_id)"
      >
      <div class="flex gap-3">
        <FeatherIcon name="edit" class="w-4 h-4"/>
         <span> Update Product</span>
      </div>
       
      </Button>
    </div>
    <div class="p-3 border w-fit bg-gray-100">
      <img
        v-if="product_details?.product_image"
        width="300px"
        height="300px"
        :src="product_details.product_image"
        alt=""
      />
      <div class="flex justify-center my-4" v-else>
        <span class="text-gray-600 text-xs font-bold">image not added</span>
      </div>
      <div class="my-3">
        <span class="text-xs">Opportunity Name:</span>
        <span class="mx-3 p-1 font-bold bg-white">{{
          product_details?.opportunity?.opportunity_name || "not added yet"
        }}</span>
      </div>
      <div class="p-1" v-if="product_details?.opportunity?.opportunity_id">
        <Button
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          @click="
            handle_view_opportunity(
              product_details?.opportunity?.opportunity_id
            )
          "
        >
          view opportunity
        </Button>
      </div>
    </div>
    <div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product Name</span> :
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.product_name
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product Type</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.product_type
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product unit price</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.unit_price
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product unit of measure</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.unit_of_measure
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Tax rate</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.tax_rate
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>description</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.description
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product availability</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.status
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product is discountable</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          product_details.discountable
        }}</span>
      </div>
      <div class="bg-gray-100 my-2 p-2">
        <span>Product date</span>
        <span class="font-bold bg-white px-2 py-1 rounded-md shadow-lg mx-4">{{
          new Date(product_details.updated_at).toLocaleDateString()
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
