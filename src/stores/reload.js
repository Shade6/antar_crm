import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReloadStore = defineStore('reload', () => {
  const reload_role = ref(true)
  const reload_user = ref(true)
  const reload_module = ref(true)
  const reload_permission = ref(true)
 const assignee_reload = ref(true)
   const set_role_reload =()=>{
       reload_role.value = ! reload_role.value
   }
   const set_user_reload = ()=>{
    reload_user.value = !reload_user.value
   }
   const set_module_reload = ()=>{
    reload_module.value = !reload_module.value
   }
   const set_permission_reload = ()=>{
    reload_permission.value = !reload_permission.value
   }
   const set_assignee_reload = ()=>{
    assignee_reload.value = !assignee_reload.value
   }


  return { reload_role,reload_user,reload_module,reload_permission, set_role_reload ,set_module_reload,set_permission_reload,set_user_reload,assignee_reload,set_assignee_reload }
})
