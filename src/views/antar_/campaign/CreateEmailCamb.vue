<script setup>
import Nav from "./nav/Nav.vue";
import TextEditor from "./page/TextEditor.vue"
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
 import {getCampaignLists} from "@/api/userApi.js"
import { TextInput , Button , Checkbox ,Dialog ,Textarea ,Autocomplete} from "frappe-ui";
const toast = useToast();
const router = useRouter();
const currentHash = ref(router.currentRoute.value.hash);
const state = ref(false)
const dialog2 = ref(false)
const campaign_list = ref([])

const fetch = async()=>{
   const res = await getCampaignLists()
   if(res.statusCode == 200){
       campaign_list.value = res.data.map((val)=>({
          label:val.list_name,
          value:val.id
       }))
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
onMounted(fetch)
watch(
  () => router.currentRoute.value.hash,
  (newHash) => {
    currentHash.value = newHash;
  }
);

const handle_create = async () => {
  toast.success("create email campaign is maintenance", {
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
};

// State for managing open accordion
const openAccordion = ref(null);

const toggleAccordion = (id) => {
  if (openAccordion.value === id) {
    openAccordion.value = null; // Close the accordion if it's already open
  } else {
    openAccordion.value = id; // Open the clicked accordion
  }
};
</script>

<template>
  <Nav @create_email_campaign="handle_create"></Nav>
  <div class="p-4">
    <div class="mb-4 flex justify-between">
      <div class="p-2 w-1/2">
        <span class="text-xs">Enter Campaign name </span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter campaign name"
          :disabled="false"
          modelValue=""
        />
      </div>
    </div>
    <div class="hs-accordion-group">
      <!-- Accordion Item 1 -->
      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-one' }"
      >
        <div class="flex justify-between py-2">
          <div class="m-3 flex">
            <div class="mx-2 flex justify-center items-center">
              <div
                v-if="true"
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
                    <polygon class="" points="1,41 0,48 25,52 25,45" />
                  </svg>
                  <svg
                    class="tick-leg2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 52"
                  >
                    <polygon class="" points="18,45 25,47 25,0 18,0" />
                  </svg>
                </div>
              </div>
              <div v-if="false" class="bg-gray-200 w-8 h-8 rounded-full"></div>
            </div>
            <div>
              <span>Sender</span>
              <br />
              <span>add your company</span>
            </div>
          </div>

          <button
            class="hs-accordion-toggle border rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-0 px-2 mr-3 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-one',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-one')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-one'"
            aria-controls="hs-basic-bordered-collapse-one"
            v-if="openAccordion == 'hs-basic-bordered-collapse-one' ?false :true"
       
          >
           
             Manage Sender
          </button>
        </div>
        <div
          id="hs-basic-bordered-collapse-one"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          :class="{
            hidden: openAccordion !== 'hs-basic-bordered-collapse-one',
          }"
          role="region"
          aria-labelledby="hs-bordered-heading-one"
        >
          <div class="pb-4 px-5">
            <div class="pb-4 px-5">
            <div>
              <div class="p-2">
                <span>Email Address</span>
                <TextInput
                  :type="'text'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Placeholder"
                  :disabled="false"
                  modelValue=""
                />
              </div>
              <div class="p-2">
                <span>Name</span>
                <TextInput
                  :type="'text'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Placeholder"
                  :disabled="false"
                  modelValue=""
                />
              </div>
              <div class="p-1 mt-4 flex justify-end">
                <Button
                class="mx-3"
                  :variant="'subtle'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="toggleAccordion(null)"
                >
                  Cancel
                </Button>
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
                >
                  Save
                </Button>
              </div>


              <div>
                 
              </div>
            </div>

            <div>
              
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- Accordion Item 2 -->
      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-two' }"
      >
        <div class="flex justify-between py-2">
          <div class="m-3 flex">
            <div class="mx-2 flex justify-center items-center">
              <div
                v-if="false"
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
                    <polygon class="" points="1,41 0,48 25,52 25,45" />
                  </svg>
                  <svg
                    class="tick-leg2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 52"
                  >
                    <polygon class="" points="18,45 25,47 25,0 18,0" />
                  </svg>
                </div>
              </div>
              <div v-if="true" class="bg-gray-200 w-8 h-8 rounded-full"></div>
            </div>
            <div>
              <span>Recipients</span>
              <br />
              <span>The people who receive your campaign</span>
            </div>
          </div>
          <button
            class="hs-accordion-toggle order rounded-md shadow-md h-[40px] my-auto inline-flex items-center gap-x-3 font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-two',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-two')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-two'"
            aria-controls="hs-basic-bordered-collapse-two"
            v-if="openAccordion === 'hs-basic-bordered-collapse-two' ? false : true"
          >
            Add Recipients
          </button>
        </div>

        <div
          id="hs-basic-bordered-collapse-two"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          :class="{
            hidden: openAccordion !== 'hs-basic-bordered-collapse-two',
          }"
          role="region"
          aria-labelledby="hs-bordered-heading-two"
        >
            

        <div class="px-6">
          <span>Send To</span>
          <div class="p-2">
            <Autocomplete
              :options="campaign_list"
              v-model="user_id"
              placeholder="Select person"
            >
              <template #prefix> </template>
              <template #item-prefix="{ option }">
                <img :src="option.image" class="h-4 w-4 rounded-full" />
              </template>
            </Autocomplete>
          </div>


        </div>
        
        <div class="px-6">
       
         <div class="my-3">
          
          <span>Filter recipients</span>
          <br>
          <Button class="" @click="dialog2 = true">
            Add A Condition
          </Button>
          <Dialog v-model="dialog2">
            <template #body-title>
              <h3>Custom Title</h3>
            </template>
            <template #body-content>
              <p>Custom Body</p>
            </template>
            <template #actions>
              <Button variant="solid">
                Confirm
              </Button>
              <Button
                class="ml-2"
                @click="dialog2 = false"
              >
                Close
              </Button>
            </template>
          </Dialog>
        </div>

         <span class="text-xs">Send to as many recipients as you wish, within your plan limits.</span>
        
        </div>

     
        <div class="p-1 my-4 flex justify-end">
                <Button
                class="mx-3"
                  :variant="'subtle'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="toggleAccordion(null)"
                >
                  Cancel
                </Button>
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
                >
                  Save
                </Button>
              </div>
        </div>
      </div>

      <!-- Accordion Item 3 -->
      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{
          active: openAccordion === 'hs-basic-bordered-collapse-three',
        }"
      >
        <div class="flex justify-between py-2">
          <div class="m-3 flex">
            <div class="mx-2 flex justify-center items-center">
              <div
                v-if="true"
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
                    <polygon class="" points="1,41 0,48 25,52 25,45" />
                  </svg>
                  <svg
                    class="tick-leg2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 52"
                  >
                    <polygon class="" points="18,45 25,47 25,0 18,0" />
                  </svg>
                </div>
              </div>
              <div v-if="false" class="bg-gray-200 w-8 h-8 rounded-full"></div>
            </div>
            <div>
              <span>Subject</span>
              <br />
              <span>Add a subject line for this campaign.</span>
            </div>
          </div>
          <button
            class="hs-accordion-toggle inline-flex items-center gap-x-3 order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-three',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-three')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-three'"
            aria-controls="hs-basic-bordered-collapse-three"
            v-if=" openAccordion === 'hs-basic-bordered-collapse-three' ? false : true"
          >
            Add Subject
          </button>
        </div>
        <div
          id="hs-basic-bordered-collapse-four"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          :class="{
            hidden: openAccordion !== 'hs-basic-bordered-collapse-three',
          }"
          role="region"
          aria-labelledby="hs-bordered-heading-three"
        >
          <div class="pb-4 px-5">
           

            <div class="p-1">
              <Textarea
                :variant="'subtle'"
                :ref_for="true"
                size="sm"
                placeholder="Placeholder"
                :disabled="false"
                modelValue=""
                label="subject line"
              />
            </div>
            <div class="p-1">
              <Textarea
                :variant="'subtle'"
                :ref_for="true"
                size="sm"
                placeholder="Placeholder"
                :disabled="false"
                modelValue=""
                label="preview text"
              />
            </div>


            <div class="p-1 mt-4 flex justify-end">
                <Button
                class="mx-3"
                  :variant="'subtle'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="toggleAccordion(null)"
                >
                  Cancel
                </Button>
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
                >
                  Save
                </Button>
              </div>
          </div>
        </div>
      </div>

      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-four' }"
      >
        <div class="flex justify-between py-2">
          <div class="m-3 flex">
            <div class="mx-2 flex justify-center items-center">
              <div
                v-if="false"
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
                    <polygon class="" points="1,41 0,48 25,52 25,45" />
                  </svg>
                  <svg
                    class="tick-leg2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 52"
                  >
                    <polygon class="" points="18,45 25,47 25,0 18,0" />
                  </svg>
                </div>
              </div>
              <div v-if="true" class="bg-gray-200 w-8 h-8 rounded-full"></div>
            </div>
            <div>
              <span> Design</span>
              <br />
              <span>Create your email content.</span>
            </div>
          </div>
          <button
            class="hs-accordion-toggle inline-flex items-center gap-x-3 order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-three',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-four')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-four'"
            aria-controls="hs-basic-bordered-collapse-four"
            v-if=" openAccordion === 'hs-basic-bordered-collapse-four' ? false :true"
          >
            Start Designing
          </button>
        </div>
        <div
          id="hs-basic-bordered-collapse-four"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          :class="{
            hidden: openAccordion !== 'hs-basic-bordered-collapse-four',
          }"
          role="region"
          aria-labelledby="hs-bordered-heading-three"
        >
          <div class="pb-4 px-5">
       





<TextEditor/>





<div class="p-1 mt-4 flex justify-end">
                <Button
                class="mx-3"
                  :variant="'subtle'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="toggleAccordion(null)"
                >
                  Cancel
                </Button>
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
                >
                  Save
                </Button>
              </div>







          </div>
        </div>
      </div>

      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-five' }"
      >
        <div class="flex justify-between py-3">
          <div class="m-3 flex">
            <div>
              <span class="font-semibold text-2xl">Additional settings</span>
            </div>
          </div>
          <button
            class="hs-accordion-toggle inline-flex items-center gap-x-3order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-five',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-five')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-five'"
            aria-controls="hs-basic-bordered-collapse-five"
          >
            Edit Settings
          </button>
        </div>
        <div
          id="hs-basic-bordered-collapse-five"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          :class="{
            hidden: openAccordion !== 'hs-basic-bordered-collapse-five',
          }"
          role="region"
          aria-labelledby="hs-bordered-heading-five"
        >
          <div class="pb-4 px-5">
            <p class="text-gray-800">
              <em>This is the first item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
