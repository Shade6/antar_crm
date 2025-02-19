<script setup>
import { ref } from "vue";
import {FeatherIcon} from "frappe-ui"
const file_list = ref([]);
const single_file = ref(null);

// Helper function to get the file icon URL based on the file extension
const getFileIcon = (file) => {
  const extension = file.name.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return "https://img.icons8.com/color/48/000000/pdf.png";
    case "xlsx":
    case "xls":
      return "https://img.icons8.com/color/48/000000/ms-excel.png";
    case "doc":
    case "docx":
      return "https://img.icons8.com/color/48/000000/ms-word.png";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      // If it's an image, you could use the file's URL if available
      return file.url || "https://img.icons8.com/color/48/000000/image.png";
    default:
      return "https://img.icons8.com/color/48/000000/file.png";
  }
};

const handle_file_change = (e) => {
  single_file.value = e.target.files;
};

const handle_file_multiple_change = (e) => {
  file_list.value = Array.from(e.target.files);
};
const deleteImage = () => {
    single_file.value = null;
};
</script>

<template>
  <div class="px-5 flex gap-2">
    <div class="border my-2 p-2">
      <span class="font-bold text-gray-700">Upload Product Image</span>
      <div class="flex">
        <form class="file-upload-form mb-4">
          <label class="file-upload-label" for="singleFile">
            <div class="file-upload-design">
              <svg height="1em" viewBox="0 0 640 512">
                <path
                  d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                ></path>
              </svg>
              <p>Drag and Drop</p>
              <p>or</p>
              <span class="browse-button">Browse file</span>
            </div>
            <input @change="handle_file_change" type="file" id="singleFile" />
          </label>
        </form>
        <div v-if="single_file" class="bg-gray-200 mb-4 mx-2 p-3 rounded-lg">
          <span class="font-bold border block mb-2">Selected Image</span>

          <div class="flex flex-wrap w-60 h-44 justify-center gap-2 relative">
            <img
              class="h-full"
              src="https://i.pinimg.com/736x/8a/97/ab/8a97abf87526fc58db514efd704227e5.jpg"
              alt="File preview"
            />
            <button
            @click="deleteImage"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            <FeatherIcon class="w-4 h-4" name="trash"/>
          </button>
          </div>
        </div>
      </div>
    </div>
    <div class="border my-2 p-2">
      <span class="font-bold text-gray-700">Upload Product Details</span>
      <div class="flex">
        <form class="file-upload-form mb-4">
          <label class="file-upload-label" for="multipleFiles">
            <div class="file-upload-design">
              <svg height="1em" viewBox="0 0 640 512">
                <path
                  d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                ></path>
              </svg>
              <p>Drag and Drop</p>
              <p>or</p>
              <span class="browse-button">Browse file</span>
            </div>
            <input
              @change="handle_file_multiple_change"
              type="file"
              id="multipleFiles"
              multiple
            />
          </label>
        </form>
        <div
          v-if="file_list.length !== 0"
          class="bg-gray-200 mb-4 mx-2 p-3 w-60 rounded-lg"
        >
          <span class="font-bold border block mb-2">Selected Files</span>
          <div
            v-for="(file, index) in file_list"
            :key="file.name"
            class="flex items-center border bg-white p-2 my-1"
          >
            <span class="font-bold mr-2">{{ index+1 }}-</span>
            <img
              :src="getFileIcon(file)"
              alt="File Icon"
              class="w-6 h-6 mr-2"
            />
            <span class="text-xs font-semibold">{{ file.name }}</span>
            <button class="" >  <FeatherIcon class="w-4 h-4 text-red-600" name="trash"/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* From Uiverse.io by alsaad1060 */
.file-upload-form {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-upload-label input {
  display: none;
}
.file-upload-label svg {
  height: 50px;
  fill: rgb(82, 82, 82);
  margin-bottom: 20px;
}
.file-upload-label {
  cursor: pointer;
  background-color: #ddd;
  padding: 30px 70px;
  border-radius: 40px;
  border: 2px dashed rgb(82, 82, 82);
  box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
}
.file-upload-design {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.browse-button {
  background-color: rgb(82, 82, 82);
  padding: 5px 15px;
  border-radius: 10px;
  color: white;
  transition: all 0.3s;
}
.browse-button:hover {
  background-color: rgb(14, 14, 14);
}
</style>
