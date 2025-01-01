<script setup >
import {ref} from 'vue'
import User from "@/components/antar_ui/user/User.vue"
const action = ref(null)
const handle_action = (data)=>{
    action.value = data
}
</script>

<template>
    <div class="p-6" v-if="action == null">
        <div>
           <h2 class="pl-13 font-bold text-2xl">Users</h2>
        </div>
         <div class="flex gap-5 my-5 pl-13">
              <div class="p-5 border rounded-md w-[20%] shadow-lg">
                  <span>User (10)</span>
              </div>
              <div class="p-5 border rounded-md w-[20%] shadow-lg">
                  <span>Role (26)</span>
              </div>
              <div class="p-5 border rounded-md w-[20%] shadow-lg">
                  <span>Permission</span>
              </div>
         </div>
         <div class="flex gap-5 pl-13">
            <div class="border p-5 shadow-lg">
                <span class="font-bold ">User management</span>
                <hr class="my-3">
        
              <button @click="handle_action('user')" href="" class="text-xl font-semibold my-3"><u>user</u></button>
              <br> 
              <button href="" class="text-xl font-semibold my-3"><u>role</u></button>
              <br>
              <button href="" class="text-xl font-semibold my-3"><u>module profile</u></button>


            </div>
            <div class="border p-5 shadow-lg">
                <span class="font-bold ">Permission management</span>
                <hr class="my-3">
        
              <button href="" class="text-xl font-semibold my-3"><u>User permission</u></button>
              <br> 
              <button href="" class="text-xl font-semibold my-3"><u>Module permission</u></button>
            

            </div>
         </div>
    </div>
   <User v-if="action == 'user'"/>
</template>

<style scoped>

</style>