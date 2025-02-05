<template>
  <div class="flex flex-col items-center pt-10 min-h-screen bg-gray-100">
    <div class="flex justify-center mb-4">
      <img
        class="h-12 w-12"
        src="https://crm.shade6.com/files/Logo.png"
        alt=""
      />
    </div>
    <h2 class="text-center text-2xl font-bold mb-6">CRM Login</h2>
    <Card class="w-full max-w-sm p-8 border-0">
      <form class="border-0 p-3" @submit.prevent="login_handler">
        <div class="mb-4">
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="border-0"
            required
          />
        </div>
        <div class="mb-6">
          <Input
            class="border-0"
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="w-full flex justify-end my-4">
          <span class="text-gray-500">Forgot Password?</span>
        </div>
        <Button
          class="w-full"
          type="submit"
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
          Login
        </Button>
        <div class="w-full flex justify-center my-5">
          <span class="text-center mx-auto">or</span>
        </div>

        <Button type="submit" class="w-full" :loading="loading">
          Login With Email Link
        </Button>
      </form>
      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Card, Input, Button } from "frappe-ui";
import { userLogin, menu } from "@/api/userApi";
import { useRouter } from "vue-router"; // Importing Vue Router
import CryptoJS from "crypto-js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const router = useRouter(); // Use router instance to navigate
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

import { useSwitchStore } from "@/stores/switch";
const switchStore = useSwitchStore();

const login_handler = async () => {
  const res = await userLogin({
    email: email.value,
    password: password.value,
  });
  if (res.status == "success") {
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role_id);
    console.log(res, "success if");
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
    const menu_res = await menu(res.role_id);
    if (menu_res.statusCode == 200) {
      const bytes = CryptoJS.AES.decrypt(menu_res.data, 'your-secret-key');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      switchStore.AddMenu(decryptedData);
     
      router.push(`/antar_/${res.landing}`);
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
const check_user_ = () => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/antar_");
    toast.success("sorry ! logged user cannot have access ", {
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
    // router.push(from);  // Redirect back to the previous route
  } else {
    router.push("/login");
  }
};
onMounted(check_user_);
</script>

<style scoped>
/* Add any additional styling here */
</style>
