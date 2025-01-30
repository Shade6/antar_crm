<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, computed, onMounted } from "vue";

import { useToast } from "vue-toast-notification";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Nav from "./nav/Nav.vue";
import {
  get_existing_org_estimate,
  get_all_organization,
  get_all_product,
  get_single_product,
  create_estimate,
  pdf_estimate_details,
  create_file_pdf,
} from "@/api/userApi";
import {
  Button,
  Dialog,
  Autocomplete,
  TextInput,
  Textarea,
  ListView,
  FeatherIcon,
  Spinner,
} from "frappe-ui";
import "@/assets/toast.css";

const toast = useToast();
const router = useRouter();
const product_id = router.currentRoute.value.hash.split("#")[1];

// Refs
const dialog2 = ref(false);
const showModal = ref(false);
const estimateContent = ref(null);
const product_list = ref([]);
const product_select_list = ref([]);
const organizations_select_list = ref([]);
const estimate_id = ref(null);
const pdf_file = ref(null);
const loader = ref(false);
// Reactive state
const form_details = reactive({
  organization: null,
  estimate_number: null,
  issue_data: null,
  discount_total: null,
  mobile: null,
  notes: null,
});

const row_details = reactive({
  id: null,
  product_name: null,
  unit_price: null,
  tax_rate: null,
  tax_total: null,
  sub_total: null,
  quantity: 1,
  description: null,
});

// Fetch data on mount
onMounted(fetch);

async function fetch() {
  const [product_res, organization_res] = await Promise.all([
    get_all_product(),
    get_all_organization(),
  ]);

  if (product_res.statusCode === 200) {
    product_select_list.value = product_res.data.map((val) => ({
      label: val.product_name,
      value: val.product_id,
    }));
  }

  if (organization_res.statusCode === 200) {
    organizations_select_list.value = organization_res.data.map((val) => ({
      label: val.organization_name,
      value: val.organization_id,
    }));
  }

  if (product_id) {
    const res = await get_existing_org_estimate(product_id);
    if (res.statusCode === 200) {
      form_details.organization = {
        value: res.data?.opportunities?.organization_id || "",
      };
      product_list.value = res.data.products.map((val) => ({
        id: val.product.product_id,
        product_name: val.product.product_name,
        unit_price: val.product.unit_price,
        tax_rate: val.product.tax_rate,
        tax_total: (
          (val.product.tax_rate / 100) *
          val.product.unit_price
        ).toFixed(2),
        sub_total: val.product.unit_price * 1,
        description: "",
        discount: val.product.unit_price,
        quantity: 1,
      }));
    }
  }
}

// Handle product selection
async function handle_select_product(data) {
  form_details.discount_total = 0;
  setTimeout(handle_add_discount, 300)
  // handle_add_discount();

  const res = await get_single_product(data);

  if (res.statusCode === 200) {
    const existingProductIndex = product_list.value.findIndex(
      (product) => product.id === res.data.product_id
    );

    if (existingProductIndex !== -1) {
      // Update existing product
      product_list.value[existingProductIndex].quantity += 1;
      updateProductTotals(product_list.value[existingProductIndex]);
    } else {
      // Add new product
      product_list.value.push({
        id: res.data.product_id,
        product_name: res.data.product_name,
        unit_price: res.data.unit_price,
        tax_rate: res.data.tax_rate,
        tax_total: ((res.data.tax_rate / 100) * res.data.unit_price).toFixed(2),
        sub_total: res.data.unit_price * 1,
        description: "",
        discount: 0,
        quantity: 1,
      });
    }
  } else {
    toast.error(res.message, { position: "top-right", duration: 3000 });
  }
}

// Update product totals
function updateProductTotals(product) {
  product.tax_total = (
    (product.tax_rate / 100) *
    product.unit_price *
    product.quantity
  ).toFixed(2);
  product.sub_total = (product.unit_price * product.quantity).toFixed(2);
}

// Handle row edit
function handle_click_d(data) {
  const product = product_list.value.find((val) => val.id === data);
  Object.assign(row_details, product); // Copy product details into row_details
  showModal.value = true;
}

// Handle row update
function handel_update_q() {
  form_details.discount_total = 0;
  setTimeout(handle_add_discount, 300)
  // handle_add_discount();
  const existingProductIndex = product_list.value.findIndex(
    (product) => product.id === row_details.id
  );

  if (existingProductIndex !== -1) {
    product_list.value[existingProductIndex] = { ...row_details };
    updateProductTotals(product_list.value[existingProductIndex]);
  }

  showModal.value = false;
}

// Handle row deletion
function deleteRow() {
  const existingProductIndex = product_list.value.findIndex(
    (product) => product.id === row_details.id
  );

  if (existingProductIndex !== -1) {
    product_list.value.splice(existingProductIndex, 1);
  }

  showModal.value = false;
}
const triggerUpdate = ref(0);

// Calculate totals
const calculate = computed(() => {
  triggerUpdate.value; // Ensure reactivity

  // Calculate subtotal with discount applied
  const sub_total = product_list.value.reduce(
    (sum, product) =>
      sum + (product.unit_price || product.unit_price) * product.quantity,
    0
  );

  const discount_total_value = product_list.value.reduce(
    (sum, product) =>
      sum + (product.sub_total || product.unit_price) * product.quantity,
    0
  );
  // Calculate tax total with discount applied
  const tax_total = product_list.value.reduce(
    (sum, product) =>
      sum +
      (product.tax_rate / 100) *
        (product.sub_total || product.unit_price) *
        product.quantity,
    0
  );

  // Calculate grand total with discount applied
  const grand_total = discount_total_value + tax_total;

  // Get the discount total from the form
  const discount_total = form_details.discount_total || 0;

  return {
    sub_total: sub_total.toFixed(2),
    tax_total: tax_total.toFixed(2),
    grand_total: grand_total.toFixed(2),
    discount_total: discount_total_value, // Use the discount total from the form
  };
});

// Save estimate
async function handle_save_estimate() {
  if (!product_id) {
    return toast.success("opportunity not found please add opportunity", {
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
  const complete_details = {
    ...form_details,
    products: product_list.value,
    opportunity_id: product_id,
    discount:calculate.discount_total,
    ...calculate.value,
  };

  const res = await create_estimate(complete_details);
  loader.value = true;
  if (res.statusCode === 200) {
    await downloadEstimate(res.data);
    toast.success(res.message, { position: "top-right", duration: 3000 });
  } else {
    loader.value = false;
    toast.error(res.message, { position: "top-right", duration: 3000 });
  }
}

// Download estimate as PDF
const pdfPreviewUrl = ref(null); // Store the preview URL
const estimateData = ref(null);
import { nextTick } from "vue";

async function downloadEstimate(estimate_id_for_pdf) {
  const res = await pdf_estimate_details(estimate_id_for_pdf, product_id);
  if (res.statusCode !== 200) {
    return toast.success(res.message, {
      position: "top-right",
      duration: 3000,
    });
  }

  estimateData.value = res.data;

  // Wait for the DOM to update
  await nextTick();

  const content = estimateContent.value;
  if (!content) {
    loader.value = false;
    console.error("Content not found");
    return toast.success("Content not available", {
      position: "top-right",
      duration: 3000,
    });
  }

  // Make sure content is visible before capturing
  content.style.display = "block";

  // Wait briefly to allow reflow
  await new Promise((resolve) => setTimeout(resolve, 300));

  let file = null;
  const pdf = new jsPDF("p", "mm", "a4"); // Initialize PDF
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  let position = 0; // Track the position of the content

  await html2canvas(content, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // Check if content exceeds the page height
    if (imgHeight > pageHeight) {
      let remainingHeight = imgHeight - pageHeight; // Calculate remaining height
      position = -remainingHeight; // Adjust position for the next page

      // Add additional pages for remaining content
      while (remainingHeight > 0) {
        pdf.addPage(); // Add a new page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight; // Reduce remaining height
        position -= pageHeight; // Adjust position for the next page
      }
    }

    const pdfBlob = pdf.output("blob");

    // Create a preview URL
    const pdfUrl = URL.createObjectURL(pdfBlob);
    pdfPreviewUrl.value = pdfUrl;

    file = new File([pdfBlob], "estimate.pdf", { type: "application/pdf" });

    // Hide content after capture
    content.style.display = "none";
  });

  if (!file) {
    return toast.success("File not added", {
      position: "top-right",
      duration: 3000,
    });
  }

  console.log(file, "===================");

  const formData = new FormData();
  formData.append("file", file);
  const res_create_file = await create_file_pdf(
    formData,
    product_id,
    estimate_id_for_pdf
  );

  if (res_create_file.statusCode === 200) {
    loader.value = false;
    pdf_file.value = res_create_file.fileUrl;
    toast.success("estimate was created and stored", {
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
    loader.value = false;
    toast.success(res_create_file.message, {
      position: "top-right",
      duration: 3000,
    });
  }
}

function formatDate(dateString) {
  if (!dateString) return "N/A"; // Handle null or undefined

  const date = new Date(dateString); // Parse the date string
  const day = String(date.getDate()).padStart(2, "0"); // Get day (dd)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (mm)
  const year = date.getFullYear(); // Get year (yyyy)

  return `${day}/${month}/${year}`; // Return formatted date
}
function calculateValidUntil(estimateCreated, issueDate) {
  // Determine the base date (use issueDate if available, otherwise use estimateCreated)
  const baseDate = issueDate ? new Date(issueDate) : new Date(estimateCreated);

  // Add 14 days to the base date
  const validUntilDate = new Date(baseDate);
  validUntilDate.setDate(baseDate.getDate() + 14);

  // Format the date as needed (e.g., toLocaleDateString)
  return validUntilDate.toLocaleDateString();
}

const handle_add_discount = () => {
  const sub_total = product_list.value.reduce(
    (sum, product) => sum + product.unit_price * product.quantity,
    0
  );

  if (sub_total === 0) return; // Prevent division by zero

  const discount_total = form_details.discount_total || 0; // Ensure discount_total is defined

  product_list.value = product_list.value.map((val) => ({
    ...val,
    sub_total:Math.round(( val.unit_price -
    (discount_total * (val.unit_price * val.quantity)) / sub_total))
     , // Proportional discount
    tax_total:Math.round(
      (val.tax_rate / 100) *
      (val.unit_price -
        (discount_total * (val.unit_price * val.quantity)) / sub_total))
  }))

  triggerUpdate.value = discount_total;
};
</script>

<template>
  <div
    v-if="loader"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    style="z-index: 99999"
  >
    <div>
      <Spinner class="w-10 mx-auto" />
      <span class="text-white">Creating Estimate please wait for a second</span>
    </div>
  </div>
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
          { label: 'Product Quantity', key: 'quantity', width: '180px' },

          { label: 'Tax Total', key: 'tax_total', width: '120px' },
          { label: 'Sub Total', key: 'sub_total', width: '120px' },
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
          <span
            class="font-medium text-ink-gray-7"
            :class="{ 'truncate-cell': column.key !== 'action' }"
          >
            {{ item }}

            <div class="p-1" v-if="column.key == 'action'">
              <div>
                <button
                  @click="handle_click_d(row.id)"
                  class="px-2 py-2 bg-gray-200 text-black font-normal rounded"
                >
                  <FeatherIcon class="w-4 h-4" name="edit" />
                </button>

                <!-- Modal -->
                <div
                  v-if="showModal"
                  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
                >
                  <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <!-- Modal Header -->
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-semibold">Edit Product</h2>
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
                            :disabled="false"
                            :modelValue="row_details.unit_price"
                            v-model="row_details.unit_price"
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
                            :disabled="false"
                            :modelValue="row_details.tax_rate"
                            v-model="row_details.tax_rate"
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
                        <div class="p-2">
                          <Textarea
                            :variant="'subtle'"
                            :ref_for="true"
                            size="sm"
                            placeholder="Placeholder"
                            :disabled="false"
                            :modelValue="row_details.description"
                            v-model="row_details.description"
                            label="Enter product Description"
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
                      >
                        Update Row
                      </Button>
                      <button
                        @click="showModal = false"
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
        <div class="w-1/2">
          <div class="flex">
            <Button class="w-36 my-auto mx-1" @click="dialog2 = true">
              Add Product
            </Button>
          </div>

          <div>
            <div class="pt-5">
              <div>
                <span class="text-sm text-red-500"
                  >(default organization address will consider)</span
                >
              </div>
              <div class="py-4">
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
            </div>
          </div>
          <Dialog v-model="dialog2">
            <template #body-title>
              <h3>Add Product</h3>
            </template>
            <template #body-content>
              <div class="p-0 my-3">
                <span class="text-gray-600">Search Product</span>
                <TextInput
                  :type="'text'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Search Product"
                  :disabled="false"
                  modelValue=""
                />
              </div>
              <div class="h-[250px] overflow-y-scroll">
                <div
                  class="p-2 border flex justify-between my-2 bg-gray-50"
                  v-for="data in product_select_list"
                >
                  <span>{{ data.label }}</span>
                  <div class="p-1">
                    <Button
                      :variant="'outline'"
                      :ref_for="true"
                      theme="gray"
                      size="sm"
                      label="Button"
                      :loading="false"
                      :loadingText="null"
                      :disabled="false"
                      :link="null"
                      @click="handle_select_product(data.value)"
                    >
                      <FeatherIcon class="w-4 h-4" name="plus-circle" />
                    </Button>
                  </div>
                </div>
              </div>
            </template>
            <template #actions>
              <Button class="ml-2" @click="dialog2 = false"> Close </Button>
            </template>
          </Dialog>
        </div>

        <div
          class="flex flex-col justify-between w-80 border p-4 rounded-lg shadow-sm mr-20"
        >
          <!-- Subtotal -->
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-600">Subtotal:</span>
            <span class="font-bold text-black">{{ calculate.sub_total }}</span>
          </div>

          <!-- Discount Input and Button -->
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-600">Discount:</span>
            <div class="flex items-center gap-2 mt-2">
              <TextInput
                class="text-gray-500 font-medium text-sm w-20"
                :type="'number'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Enter discount"
                :disabled="false"
                :modelValue="form_details.discount_total"
                v-model="form_details.discount_total"
              />
              <Button
                :variant="'solid'"
                :ref_for="true"
                theme="gray"
                size="sm"
                label="Add"
                :loading="false"
                :loadingText="null"
                :disabled="false"
                :link="null"
                @click="handle_add_discount"
              />
            </div>
          </div>
          <!-- Discount Total -->
          <div class="flex justify-between items-center mt-2">
            <span class="font-semibold text-gray-600">Discount Total:</span>
            <span class="font-bold text-black">{{
              calculate.discount_total.toFixed(2)
            }}</span>
          </div>

          <!-- Tax Total -->
          <div class="flex justify-between items-center mt-2">
            <span class="font-semibold text-gray-600">Tax Total:</span>
            <span class="font-bold text-black">{{ calculate.tax_total }}</span>
          </div>

          <!-- Grand Total -->
          <div class="flex justify-between items-center mt-2 border-t-2 pt-1">
            <span class="font-semibold text-gray-600">Grand Total:</span>
            <span class="font-bold text-black">{{
              calculate.grand_total
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    ref="estimateContent"
    style="width: fit-content; line-height: 12px; display: none"
  >
    <div
      style="
        font-family: Arial, sans-serif;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      "
    >
      <!-- Company Info -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div style="text-align: left; width: 50%">
          <h2 style="margin-bottom: 10px; font-size: 20px; color: #333">
            {{ estimateData?.organization?.organization_name }}
          </h2>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            {{ estimateData?.address?.line_one }},
            {{ estimateData?.address?.line_two }},
            {{ estimateData?.address?.city }},
            {{ estimateData?.address?.state }},
            {{ estimateData?.address?.country }} -
            {{ estimateData?.address?.code }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            Website: {{ estimateData?.organization?.website || "N/A" }}
          </p>
        </div>

        <!-- Estimate Title -->
        <div
          style="display: flex; justify-content: right; flex-direction: column"
        >
          <h3 style="margin: 0; font-size: 24px; color: #333">ESTIMATE</h3>
          <!-- <img
          width="80"
          height="80"
          style="border-radius: 50%; border: 1px solid #ccc; margin-top: 5px;"
          :src="estimateData?.organization?.image"
          alt="Company Logo"
        /> -->
        </div>
      </div>

      <!-- Billing and Estimate Info -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <div style="width: 50%">
          <h4 style="margin: 0; font-size: 14px; color: #333">BILL TO:</h4>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            <strong>Contact Name:</strong>
            {{ estimateData?.contact?.company_name }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            <strong>Address:</strong>
            {{ estimateData?.contact?.address_contact?.address_line_1 }},
            {{ estimateData?.contact?.address_contact?.address_line_2 }},
            {{ estimateData?.contact?.address_contact?.city }}
            {{ estimateData?.contact?.address_contact?.state }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            <strong>Phone:</strong>
            {{ estimateData?.contact?.phone || "N/A" }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            <strong>Email:</strong>
            {{ estimateData?.contact?.email_id || "N/A" }}
          </p>
        </div>

        <div style="width: 50%; text-align: right">
          <h4 style="margin: 0; font-size: 14px; color: #333">
            Estimate No: {{ estimateData?.estimate_number }}
          </h4>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            Created: {{ formatDate(estimateData?.estimate_created) }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            Issue Date:
            {{ new Date(estimateData?.issue_date).toLocaleDateString() }}
          </p>
          <p style="margin: 3px 0; font-size: 12px; color: #666">
            Valid for:
            {{
              calculateValidUntil(
                estimateData?.estimate_created,
                estimateData?.issue_date
              )
            }}
          </p>
        </div>
      </div>

      <!-- Products Table -->
      <table
        style="
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          border: 1px solid #ccc;
        "
      >
        <thead>
          <tr style="background-color: #f9f9f9">
            <th
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: left;
              "
            >
              Product
            </th>
            <th
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: center;
              "
            >
              QTY
            </th>
            <th
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: right;
              "
            >
              UNIT PRICE
            </th>
            <th
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: right;
              "
            >
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in estimateData?.products"
            :key="product.estimate_item_id"
          >
            <td
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: left;
              "
            >
              {{ product?.product?.product_name }}
            </td>
            <td
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: center;
              "
            >
              {{ product?.quantity }}
            </td>
            <td
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: right;
              "
            >
              ₹{{ product?.unit_price?.toFixed(2) }}
            </td>
            <td
              style="
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 12px;
                text-align: right;
              "
            >
              ₹{{ (product?.unit_price * product?.quantity).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Totals -->
      <div style="margin-top: 20px; text-align: right">
        <div
          style="
            border: 1px solid #ddd;
            padding: 15px;
            max-width: 300px;
            margin-left: auto;
            font-family: Arial, sans-serif;
          "
        >
          <!-- Subtotal -->
          <div
            style="display: flex; justify-content: space-between; margin: 3px 0"
          >
            <span style="font-size: 12px; color: #333"
              ><strong>SUBTOTAL:</strong></span
            >
            <span style="font-size: 12px; color: #333"
              >₹{{ estimateData?.sub_total?.toFixed(2) }}</span
            >
          </div>
          <!-- Discount -->
          <div
            style="display: flex; justify-content: space-between; margin: 3px 0"
          >
            <span style="font-size: 12px; color: #333"
              ><strong> DISCOUNT TOTAL:</strong></span
            >
            <span style="font-size: 12px; color: #333"
              >₹{{ estimateData?.discount_total?.toFixed(2) }}</span
            >
          </div>
        
         
          <!-- Tax Rate -->
          <div
            style="display: flex; justify-content: space-between; margin: 3px 0"
          >
            <span style="font-size: 12px; color: #333"
              ><strong>TOTAL TAX:</strong></span
            >
            <span style="font-size: 12px; color: #333"
              >₹{{ estimateData?.tax_total?.toFixed(2) }}</span
            >
          </div>
          <!-- Shipping/Handling -->
          <div
            style="display: flex; justify-content: space-between; margin: 3px 0"
          >
            <span style="font-size: 12px; color: #333"
              ><strong>SHIPPING/HANDLING:</strong></span
            >
            <span style="font-size: 12px; color: #333">₹0.00</span>
          </div>
          <!-- Grand Total -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              border-top: 1px solid #ddd;
              padding-top: 5px;
            "
          >
            <span style="font-size: 14px; color: #333"
              ><strong>Grand Total:</strong></span
            >
            <span style="font-size: 14px; color: #333"
              >₹{{ estimateData?.grand_total?.toFixed(2) }}</span
            >
          </div>
        </div>
      </div>

      <!-- Terms and Instructions -->
      <div style="margin-top: 20px">
        <p style="margin: 0; font-size: 12px; color: #666">
          {{ estimateData?.notes }}
        </p>
      </div>

      <!-- Thank You Message -->
      <div style="margin-top: 30px; text-align: center">
        <p style="margin: 0; font-size: 12px; color: #666">
          Thank you for your business!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate-cell {
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflow */
  display: inline-block; /* Ensure the span behaves like a block */
  max-width: 100%; /* Ensure it respects the column width */
}
</style>
