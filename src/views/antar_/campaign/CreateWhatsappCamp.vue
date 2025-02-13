<script setup>
import Nav from "./nav/Nav.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { TextInput } from "frappe-ui";

const toast = useToast();
const router = useRouter();
const currentHash = ref(router.currentRoute.value.hash);

watch(
  () => router.currentRoute.value.hash,
  (newHash) => {
    currentHash.value = newHash;
  }
);

const handle_create = async () => {
  toast.success("create whatsapp campaign is maintenance", {
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
  <Nav @create_whatsapp_campaign="handle_create"></Nav>
  <div class="p-4">
    <div class="mb-4 flex justify-between">
      <div class="p-2 w-1/2">
        <span class="text-xs">Enter Campaign name </span>
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
    </div>
    <div class="hs-accordion-group">
      <!-- Accordion Item 1 -->
      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-one' }"
      >
        <div class="flex justify-between">
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
            <p class="text-gray-800">
              <em>This is the third item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      </div>

      <!-- Accordion Item 2 -->
      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-two' }"
      >
       
      <div class="flex justify-between">
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
            class="hs-accordion-toggle order rounded-md shadow-md h-[40px] my-auto inline-flex items-center gap-x-3 font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            :class="{
              'hs-accordion-active:text-blue-600':
                openAccordion === 'hs-basic-bordered-collapse-two',
            }"
            @click="toggleAccordion('hs-basic-bordered-collapse-two')"
            aria-expanded="openAccordion === 'hs-basic-bordered-collapse-two'"
            aria-controls="hs-basic-bordered-collapse-two"
          >
           
            Accordion #2
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
          <div class="pb-4 px-5">
            <p class="text-gray-800">
              <em>This is the second item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
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
      <div class="flex justify-between">
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
          class="hs-accordion-toggle inline-flex items-center gap-x-3 order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          :class="{
            'hs-accordion-active:text-blue-600':
              openAccordion === 'hs-basic-bordered-collapse-three',
          }"
          @click="toggleAccordion('hs-basic-bordered-collapse-three')"
          aria-expanded="openAccordion === 'hs-basic-bordered-collapse-three'"
          aria-controls="hs-basic-bordered-collapse-three"
        >
          
          Accordion #3
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

      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-four' }"
      >
      <div class="flex justify-between">
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
          class="hs-accordion-toggle inline-flex items-center gap-x-3 order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          :class="{
            'hs-accordion-active:text-blue-600':
              openAccordion === 'hs-basic-bordered-collapse-three',
          }"
          @click="toggleAccordion('hs-basic-bordered-collapse-four')"
          aria-expanded="openAccordion === 'hs-basic-bordered-collapse-four'"
          aria-controls="hs-basic-bordered-collapse-four"
        >
          
          Accordion #4
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

      <div
        class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg"
        :class="{ active: openAccordion === 'hs-basic-bordered-collapse-five' }"
      >
      <div class="flex justify-between">
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
          class="hs-accordion-toggle inline-flex items-center gap-x-3order rounded-md shadow-md h-[40px] my-auto font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          :class="{
            'hs-accordion-active:text-blue-600':
              openAccordion === 'hs-basic-bordered-collapse-five',
          }"
          @click="toggleAccordion('hs-basic-bordered-collapse-five')"
          aria-expanded="openAccordion === 'hs-basic-bordered-collapse-five'"
          aria-controls="hs-basic-bordered-collapse-five"
        >
         
          Accordion #5
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
