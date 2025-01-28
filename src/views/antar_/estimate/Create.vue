<script setup>
import { useRouter } from "vue-router";
import html2pdf from 'html2pdf.js';
import Nav from "./nav/Nav.vue";
import {
  get_existing_org_estimate,
  get_all_organization,
  get_all_product,
  get_single_product,
  create_estimate
} from "@/api/userApi";
import { onMounted, ref,computed } from "vue";
import {
  Button,
  Dialog,
  Autocomplete,
  TextInput,
  Dropdown,
  Textarea,
  ListView,
} from "frappe-ui";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import FeatherIcon from "frappe-ui/src/components/FeatherIcon.vue";
const toast = useToast();
const router = useRouter();
const product_id = router.currentRoute.value.hash.split("#")[1];
const estimate_details = ref(null);
const product_list = ref([]);
const product_select_list = ref([]);
const organizations_select_list = ref([]);


const form_details = ref({
  organization: null,
  estimate_number: null,
  issue_data: null,
  discount_total: null,
  mobile: null,
  notes: null,
});
const row_details = ref(null);




const fetch = async () => {
  const product_res = await get_all_product();
  if (product_res.statusCode == 200) {
    product_select_list.value = product_res.data.map((val) => ({
      label: val.product_name,
      value: val.product_id,
      onClick: () => {
        handle_select_product(val.product_id);
      },
    }));
  }
  const handle_select_product = async (data) => {
    const res = await get_single_product(data);

    if (res.statusCode === 200) {
      const existingProductIndex = product_list.value.findIndex(
        (product) => product.id === res.data.product_id
      );

      if (existingProductIndex !== -1) {
        // If the product exists, increase its quantity
        product_list.value[existingProductIndex].quantity += 1;
      } else {
        // If the product does not exist, add it to the list
        const details = {
          id: res.data.product_id,
          product_name: res.data.product_name,
          unit_price: res.data.unit_price,
          tax_rate: res.data.tax_rate,
          quantity: 1,
        };
        product_list.value = [...product_list.value, details];
      }
    } else {
      // Show a toast for errors
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

  const organization_res = await get_all_organization();
  if (organization_res.statusCode == 200) {
    organizations_select_list.value = organization_res.data.map((val) => ({
      label: val.organization_name,
      value: val.organization_id,
    }));
  }

  if (product_id) {
    const res = await get_existing_org_estimate(product_id);
    if (res.statusCode == 200) {
      form_details.value.organization = {
        value:res.data?.opportunities?.organization_id || ''
      }
      product_list.value = res.data.products.map((val) => ({
        id: val.product.product_id,
        product_name: val.product.product_name,
        unit_price: val.product.unit_price,
        tax_rate: val.product.tax_rate,
        quantity: 1,
      }));
      estimate_details.value = res.data;
    }
  }
};

const handle_click_d = async (data) => {
  showModal.value = true;
  row_details.value = product_list.value.find((val) => val.id == data);
};

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
};

const deleteRow = () => {
  const product_id = row_details.value.id;
  if (!product_id) {
    return toast.success("cannot find proudct", {
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
  const existingProductIndex = product_list.value.findIndex(
    (product) => product.id === product_id
  );
  product_list.value.splice(existingProductIndex, 1);
  showModal.value = false;
};
const handel_update_q = () => {
  const product_id = row_details.value.id;
  if (!product_id) {
    return toast.success("cannot find proudct", {
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
  const existingProductIndex = product_list.value.findIndex(
    (product) => product.id === product_id
  );
  product_list.value[existingProductIndex].quantity =
    row_details.value.quantity;
  showModal.value = false;
};
onMounted(fetch);
const calculate = computed(() => {

   const sub_total =   product_list.value.reduce((sum, product) => {
    return sum + product.unit_price * product.quantity;
  }, 0);

  const grand_total =  product_list.value.reduce((sum, product) => {
    const productTotal = product.unit_price * product.quantity;
    const taxAmount = (product.tax_rate / 100) * product.unit_price;
    return sum + productTotal + taxAmount*product.quantity;
  }, 0);

  const tax_total = product_list.value.reduce((sum, product) => {
    const taxAmount = (product.tax_rate / 100) * product.unit_price;
    return sum +taxAmount*product.quantity;
  }, 0);
  return {sub_total:sub_total,grand_total:grand_total,tax_total:tax_total}
});

// Computed property to calculate grand total (including tax)
const handle_save_estimate = async()=>{
   const complete_details = {
    organization:form_details.value.organization,
    estimate_number:form_details.value.estimate_number,
    issue_date:form_details.value.issue_data,
    notes:form_details.value.notes,
    products:product_list.value,
    discount_total:form_details.value.discount_total,
    tax_total:calculate.value.tax_total,
    sub_total:calculate.value.sub_total,
    grand_total:calculate.value.grand_total,
   }

   const res = await create_estimate(complete_details)
   if(res.statusCode==200){
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


function downloadEstimate() {
  console.log('working')
  const estimateContent = document.querySelector('[ref="estimateContent"]');
  
  const options = {
    margin:       10,
    filename:     'estimate.pdf',
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf()
    .from(estimateContent)
    .set(options)
    .save();
}
const estimateData = {
    organization: {
      name: 'kerala org',
      address: {
          home:'eramangalam',
          post:'balusery',
          taluk:'balussery',
          state:'kerala'
      },
      estimate_number: '333222',
      issue_date: '2025-01-31',
      notes: 'this is the note for the estimate',
    },
    products: [
      {
        id: '821c8854-6f9f-4b14-9eef-c07ebbf929e9',
        product_name: 'product with image',
        unit_price: 12,
        tax_rate: 3,
        quantity: 1
      },
      {
        id: '853eaa83-4c39-40e6-be57-89ee4a63a787',
        product_name: 'product one',
        unit_price: 121,
        tax_rate: 3,
        quantity: '2'
      },
      {
        id: '852c1910-a6fd-4cb8-9b30-ae9d96b62202',
        product_name: 'product two',
        unit_price: 1212,
        tax_rate: 3,
        quantity: '5'
      }
    ],
    discount_total: '6500',
    tax_total: 189.42,
    sub_total: 6314,
    grand_total: 6503.42
  };
</script>

<template>
  <Nav @save="handle_save_estimate"></Nav>

  <div class="p-4">
    <div class="mx-4">
      <hr />
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">organization</span>
        <Autocomplete
          class="w-[90%]"
          :options="organizations_select_list"
          v-model="form_details.organization"
          placeholder="Select salutation"
        />
      </div>
      <div class="flex justify-between">
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Estimate number</span
          >
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter estimate number"
            :disabled="false"
            :modelValue="form_details.estimate_number"
            v-model="form_details.estimate_number"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Issue Date</span>
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'date'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter issue date"
            :disabled="false"
            :modelValue="form_details.issue_data"
            v-model="form_details.issue_data"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Discount total</span
          >
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'number'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter discount total"
            :disabled="false"
            :modelValue="form_details.discount_total"
            v-model="form_details.discount_total"
          />
        </div>
      </div>

      <div class="p-1">
        <Textarea
          :variant="'subtle'"
          :ref_for="true"
          size="sm"
          placeholder="Placeholder"
          :disabled="false"
          :modelValue="form_details.notes"
          v-model="form_details.notes"
          label="Notes"
        />
      </div>

      <ListView
        class="h-[250px] my-4 border rounded-md"
        :columns="[
          { label: 'Product Name', key: 'product_name', width: '180px' },
          { label: 'Product Unit Price', key: 'unit_price', width: '150px' },
          {
            label: 'Product Tax Rate Per Unit',
            key: 'tax_rate',
            width: '180px',
          },
          { label: 'product Quantity', key: 'quantity', width: '180px' },
          { label: 'Product Action', key: 'action', width: '180px' },
        ]"
        :rows="product_list"
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

            <div class="p-1" v-if="column.key == 'action'">
              <div>
                <button
                  @click="handle_click_d(row.id)"
                  class="px-2 py-0 bg-gray-200 text-black font-normal rounded"
                >
                  Product Action
                </button>

                <!-- Modal -->
                <div
                  v-if="showModal"
                  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
                >
                  <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <!-- Modal Header -->
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-semibold">Modal Title</h2>
                      <button
                        @click="closeModal"
                        class="text-gray-400 hover:text-gray-800"
                      >
                        &times;
                      </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="mt-4">
                      <div>
                        <div class="p-2">
                          <span>Enter product name</span>
                          <TextInput
                            :type="'string'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="Placeholder"
                            :disabled="true"
                            :modelValue="row_details?.product_name"
                          />
                        </div>
                        <div class="p-2">
                          <span>Enter product unit price</span>
                          <TextInput
                            :type="'number'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="Placeholder"
                            :disabled="true"
                            :modelValue="row_details?.unit_price"
                          />
                        </div>
                        <div class="p-2">
                          <span>Enter product tax rate (in %)</span>
                          <TextInput
                            :type="'number'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="Placeholder"
                            :disabled="true"
                            :modelValue="row_details?.tax_rate"
                          />
                        </div>
                        <div class="p-2">
                          <span>Enter product quantity</span>
                          <TextInput
                            :type="'number'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="Placeholder"
                            :disabled="false"
                            :modelValue="row_details.quantity"
                            v-model="row_details.quantity"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="mt-6 flex justify-end">
                      <Button
                        :variant="'subtle'"
                        :ref_for="true"
                        theme="red"
                        size="sm"
                        label="Delete Row"
                        :loading="false"
                        :loadingText="null"
                        :disabled="false"
                        :link="null"
                        @click="deleteRow"
                      >
                        Delete Row
                      </Button>
                      <Button
                        @click="handel_update_q"
                        class="ml-2"
                        variant="solid"
                        >Update Row</Button
                      >
                      <button
                        @click="closeModal"
                        class="px-2 py-0 mx-3 border-2 font-normal text-black rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </template>
      </ListView>
      <div class="flex justify-between">
        <Dropdown
          :options="product_select_list"
          :button="{
            label: 'Add Proudct',
          }"
        />
        <div>
          <span class="font-semibold text-gray-600 my-auto mx-4"
          >tax total: <span class="font-bold text-black">{{ calculate.tax_total.toFixed(2) }}</span>
        </span> +
          <span class="font-semibold text-gray-600 my-auto mx-4"
          >sub total: <span class="font-bold text-black">{{ calculate.sub_total }}</span>
        </span>
        :
          <span class="font-semibold text-gray-600 my-auto"
          >Grand total: <span class="font-bold text-black">{{ calculate.grand_total.toFixed(2) }}</span>
        </span>
        </div>
     
      </div>
      
     
    </div>
    <div>
      <div class="px-4 pt-5">
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
    @click="downloadEstimate"
  >
  <div class="flex gap-2"> 
    <FeatherIcon class="w-4" name="file-text" />
    <span>  Download Estimate Model</span>
  </div>
  
  </Button>
  <div >
 
    <span class=" text-sm text-red-500">(default organization address will consider)</span>

  </div>

</div>
    </div>
  </div>
  <div ref="estimateContent" style="width: fit-content;display: none;">
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">

        <!-- Company Info -->
         <div style="display: flex;justify-content: space-evenly;">

         
        <div style="text-align: start; margin-bottom: 30px;width: 50%">
          <h2>Company Name</h2>
          <p>123 Street Address, City, State, Zip/Post</p>
          <p>Website: www.company.com | Email: info@company.com | Phone: (123) 456-7890</p>
        </div>

        <!-- Estimate Title -->
        <div style="display: flex;justify-content: center;align-items: center;flex-direction: column; margin-bottom: 30px;width: 50%">
          <h3>ESTIMATE</h3>
          <img width="100" height="100" style="border-radius: 50%;border: solid 1px black;" src="https://i.pinimg.com/736x/b4/79/a3/b479a3a83df036b7a9a249190a959c96.jpg" alt="">
        </div>
      </div>
        <!-- Billing and Shipping Info -->
        <div style="display: flex;justify-content: space-between;  margin-bottom: 30px;">
          <div style="display: flex;">

        
          <div >
            <h4>BILL TO</h4>
            <p><strong>Contact Name</strong></p>
            <p><strong>Client Company Name</strong></p>
            <p>Address</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: client@example.com</p>
          </div>
    
        </div>
          <div style="width: 200px; text-align: right;">
            <h4>Estimate No:#INV0001</h4>
            <p></p>
            <h4>Date:{{estimateData.organization.issue_date}} </h4>
           
            <h4>Valid For:14 Days</h4>
          
          </div>
        </div>

        <!-- Products Table -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ccc;">
          <thead>
            <tr>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">DESCRIPTION</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">QTY</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">UNIT PRICE</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in estimateData.products" :key="product.id">
              <td style="border: 1px solid #ccc; padding: 8px;">{{ product.product_name }}</td>
              <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">{{ product.quantity }}</td>
              <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">₹{{ product.unit_price }}</td>
              <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">₹{{ (product.unit_price * product.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Totals -->
        <div style="margin-top: 20px; text-align: right;">
          <p><strong>SUBTOTAL:</strong> ₹{{ estimateData.sub_total.toFixed(2) }}</p>
          <p><strong>DISCOUNT:</strong> ₹{{ estimateData.discount_total }}</p>
          <p><strong>SUBTOTAL LESS DISCOUNT:</strong> ₹{{ (estimateData.sub_total - estimateData.discount_total).toFixed(2) }}</p>
          <p><strong>TAX RATE:</strong> {{ estimateData.tax_total }}%</p>
          <p><strong>TOTAL TAX:</strong> ₹{{ estimateData.tax_total.toFixed(2) }}</p>
          <p><strong>SHIPPING/HANDLING:</strong> ₹0.00</p>
          <p><strong>Quote Total:</strong> ₹{{ estimateData.grand_total.toFixed(2) }}</p>
        </div>

        <!-- Terms and Instructions -->
        <div style="margin-top: 30px;">
          <h4>Terms & Instructions</h4>
          <p>Add payment requirements here, for example deposit amount and payment method.</p>
          <p>Add terms here, e.g: warranty, returns policy...</p>
          <p>Include project timeline.</p>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
</template>

<style scoped></style>
