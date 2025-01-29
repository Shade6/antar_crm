<script setup>
import Nav from "./nav/Nav.vue";
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
import { find_all_estimate ,find_pdf} from "@/api/userApi";
import { onMounted, ref } from "vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const estimate_list = ref([]);
const fetch = async () => {
  const res = await find_all_estimate();
  estimate_list.value = res.data.map((val) => ({
    id: val.estimate_id,
    estimate_number: val.estimate_number,
    sub_total: val.sub_total,
    tax_total: val.tax_total,
    grand_total: val.grand_total,
  }));
};

const handle_item =async(data)=>{
  const res = await find_pdf(data)
  if(res.statusCode == 200){
    window.open(res.data, "_blank");
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
onMounted(fetch);
</script>
<!-- :columns="[ { label: 'Estimate code ', key: 'estimate_number', icon: 'user',
width: '180px' }, { label: 'sub total', key: 'sub_total', width: '180px' }, {
label: 'tax total', key: 'tax_total', width: '150px' }, { label: 'grand total',
key: 'grand_total', width: '180px' }, { label:'download Estimate'
,key:'download',width:'180px'} ]" -->

<template>
  <Nav></Nav>
  <div class="p-4">
    <ListView
      class="h-[250px]"
      :columns="[
        {
          label: 'Estimate code ',
          key: 'estimate_number',
          icon: 'user',
          width: '180px',
        },
        { label: 'sub total', key: 'sub_total', width: '180px' },
        { label: 'tax total', key: 'tax_total', width: '150px' },
        { label: 'grand total', key: 'grand_total', width: '180px' },
        { label: 'view Estimate', key: 'download', width: '180px' },
      ]"
      :rows="estimate_list"
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
          },
        },
      }"
      row-key="id"
    >
      <template #cell="{ item, row, column }">
        <span class="font-medium text-ink-gray-7">
          {{ item }}

          <div class="p-1" v-if="column.key == 'download'">
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

              @click="handle_item(row.id)"
            >
              View Estimate
            </Button>
          </div>
        </span>
      </template>
    </ListView>
  </div>
</template>

<style scoped></style>
