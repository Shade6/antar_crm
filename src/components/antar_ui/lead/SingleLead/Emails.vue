<script setup>
import { ref } from "vue";
import { Button, FeatherIcon } from "frappe-ui";

const email_state = ref(null);
const email_lists = ref([]);
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Emails </span>
    <div class="p-1">
      <Button
        v-if="email_state == null"
        @click="email_state = 'create'"
        style="width: 150px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="plus" /> <span>New Email</span>
        </div>
      </Button>
    </div>
  </div>

  <div
    v-if="email_lists.length == 0"
    class="p-3 flex justify-center items-center"
  >
    <div class="flex flex-col items-center">
      <FeatherIcon class="w-14" name="mail" />
      <span>No Email Communication</span>
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
        >
          New Email
        </Button>
      </div>
    </div>
  </div>

  <div class="w-full border h-full" v-if="email_state == 'create'">
    <div class="p-3" style="border-bottom: solid 1px #e5e4e2">
      <div class="p-1 mb-3" style="border-bottom: solid 1px #e5e4e2">
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
        >
          Replay
        </Button>

        <Button
          :variant="'ghost'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Comment
        </Button>
      </div>
      <div class="flex justify-between my-4">
        <div class="my-3">
          <div class="flex my-2">
            <span class="text-gray-500 mx-2">TO:</span>
            <span class="bg-gray-200 px-2 rounded-sm">vidhul@gmail.com</span>
          </div>
          <div class="flex">
            <span class="text-gray-500 mx-2">SUBJECT:</span>
            <span>MR vidhul prasad </span>
          </div>
        </div>
        <div class="flex">
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
            >
              CC
            </Button>
          </div>
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
            >
              BCC
            </Button>
          </div>
        </div>
      </div>

      <div class="" style="border-top: solid 1px #e5e4e2">
        <!-- component -->
        <div class="w-full bg-white flex overflow-x-auto custom-scrollbar">
          <div class="flex-1">
            <div class="mb-6 pt-4">
              <div>
                <textarea
                  id="body"
                  class="w-full h-64 text-gray-700 border-none focus:outline-none focus:ring-0 focus:border-transparent"
                  placeholder="Message..."
                ></textarea>
              </div>
              <div class="flex items-center space-x-2 my-2">
                <div
                  class="w-40 flex items-center justify-between text-gray-600 px-2 py-1.5 border border-gray-400 rounded-lg hover:bg-gray-200"
                >
                  <div class="w-28 flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span class="text-sm truncate">Review.zip</span>
                  </div>
                  <button class="hover:text-gray-900" title="Remove">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  class="w-40 flex items-center justify-between text-gray-600 px-2 py-1.5 border border-gray-400 rounded-lg hover:bg-gray-200"
                >
                  <div class="w-28 flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span class="text-sm truncate">Approve.zip</span>
                  </div>
                  <button class="hover:text-gray-900" title="Remove">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-2">
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
                    >
                      Sent
                    </Button>
                  </div>
                  <button title="Attach Files">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-gray-500 hover:text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
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
                    @click="email_state = null"
                  >
                    Discard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
