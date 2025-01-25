<script setup>
import { onMounted, ref } from "vue";
import Nav from "./nav/Nav.vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import {
    ListView,
    FeatherIcon,
    ListHeader,
    ListHeaderItem,
    ListRows,
    ListRow,
    ListRowItem,
    ListSelectBanner,
    Button,
  } from "frappe-ui";
import { get_all_product,delete_product } from "@/api/userApi";
import { useRouter } from "vue-router";
const router = useRouter();
const products = ref([]);
const fetch_products = async()=>{
  try {
    const res = await get_all_product();
    if (res.statusCode === 200) {
      products.value = res.data.map(product => ({
        id: product.product_id,
        name: {
          label: product.product_name,
          image: 'https://via.placeholder.com/150', // Placeholder image
        },
        unit_price: product.unit_price || 'N/A', // Assuming email is part of the product data
        type: {
          label: product.product_type,
          color: 'blue', // Placeholder color
        },
        status: {
          label: product.status,
          bg_color: product.status === 'Active' ? 'bg-surface-green-3' : 'bg-surface-red-5',
        },
      }));
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}
onMounted(async () => {
  fetch_products()
});
const handleDelete = async(id)=>{
  const res = await delete_product(id)
  if(res.statusCode === 200){
    fetch_products()
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
}
</script>

<template>
  <Nav></Nav>
  <div class="p-4">
    <div>
      <ListView
        class="h-[150px]"
        :columns="[
          {
            label: 'Product Name',
            key: 'name',
            width: 1,
            icon: 'user',
          },
          {
            label: 'Unit Price',
            key: 'unit_price',
            width: '200px',
            icon: 'at-sign',
          },
          {
            label: 'Product Type',
            key: 'type',
            icon: 'users',
          },
          {
            label: 'Status',
            key: 'status',
            icon: 'check-circle',
          },
        ]"
        :rows="products"
        :options="{
          onRowClick: (row) => router.push(`/antar_/product-services/${row.id}`),
          selectable: true,
          showTooltip: true,
          resizeColumn: true,
          emptyState: {
            title: 'No products found',
            description: 'Create a new product to get started',
            button: {
              label: 'New Product',
              variant: 'solid',
            },
          },
        }"
        row-key="id"
      >
        <ListHeader>
          <ListHeaderItem
            v-for="column in $options.columns"
            :key="column.key"
            :item="column"
          >
            <template #prefix="{ item }">
              <FeatherIcon
                :name="item.icon"
                class="h-4 w-4"
              />
            </template>
          </ListHeaderItem>
        </ListHeader>
        <ListRows>
          <ListRow
            v-for="row in products"
            :key="row.id"
            :row="row"
          >
            <template #default="{ column, item }">
              <ListRowItem
                :item="item"
                :align="column.align"
              >
                <template #prefix>
                </template>
              </ListRowItem>
            </template>
          </ListRow>
        </ListRows>
        <ListSelectBanner>
          <template #actions="{ selections,unselectAll }">
            <div class="flex gap-2">
              <Button
                variant="ghost"
                label="Delete"
              @click="handleDelete(selections)"
              />
      
            </div>
          </template>
        </ListSelectBanner>
      </ListView>
    </div>
  </div>
</template>

<style scoped></style>
