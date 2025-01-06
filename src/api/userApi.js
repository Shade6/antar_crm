


// const image_upload_url = "https://api.letslegislate.in/"
// export const Image_url = "https://api.letslegislate.in/uploads/"

import axiosInstance from "./APIintercepter";
import { useSwitchStore } from '@/stores/switch';
const switchStore = useSwitchStore();

export const userLogin = async (data) => {
  return (await axiosInstance.post(`login`,data)).data;
};

export const menu = async(data)=>{
  return(await axiosInstance.get(`menu?role_id=${data}`)).data;
}

export const findAllUsers = async(data)=>{
  return (await axiosInstance.get(`get_all_user?mdl=${switchStore.pageId}`)).data
}

export const findAllRole = async(data)=>{
  return (await axiosInstance.get(`get_all_role?mdl=${switchStore.pageId}`)).data
}

export const findAllPermission = async(data)=>{
  return (await axiosInstance.get(`get_all_module_permission?mdl=${switchStore.pageId}`)).data
}

export const findAllModule = async(data)=>{
  return (await axiosInstance.get(`get_all_module?mdl=${switchStore.pageId}`)).data
}

export const create_user = async(data)=>{
  return (await axiosInstance.post(`create_user?mdl=${switchStore.pageId}`,data)).data
}

export const create_role = async(data)=>{
  return (await axiosInstance.post(`create_role?mdl=${switchStore.pageId}`,data)).data
}

export const create_permission = async(data)=>{
  return (await axiosInstance.post(`create_permission?mdl=${switchStore.pageId}`,data)).data
}

export const create_module = async(data)=>{
  return (await axiosInstance.post(`create_module?mdl=${switchStore.pageId}`,data)).data
}

export const findAllRolePermission = async(data)=>{
  return (await axiosInstance.get(`find_all_role_permissions?mdl=${switchStore.pageId}&&role=${data}`)).data
}


export const permission_giver = async(data)=>{
  return (await axiosInstance.put(`permission_giver?mdl=${switchStore.pageId}`,data)).data
}

export const create_industry = async(data)=>{
  return (await axiosInstance.post(`create_industry?mdl=${switchStore.pageId}`,data)).data
}

export const find_all_industry = async(data)=>{
  return (await axiosInstance.get(`find_all_industry?mdl=${switchStore.pageId}&&role=${data}`)).data
}

export const create_territory = async(data)=>{
  return (await axiosInstance.post(`create_territory?mdl=${switchStore.pageId}`,data)).data
}

export const find_all_territories = async(data)=>{
  return (await axiosInstance.get(`find_all_territories?mdl=${switchStore.pageId}&&role=${data}`)).data
}

export const find_one_territory = async(data)=>{
  return (await axiosInstance.get(`find_one_territory?mdl=${switchStore.pageId}&&territory_id=${data}`)).data
}

export const update_territory = async(data)=>{
  return (await axiosInstance.put(`update_territory?mdl=${switchStore.pageId}`,data)).data
}


export const find_all_lead = async(data)=>{
  return (await axiosInstance.get(`get_leads?mdl=${switchStore.pageId}&&role=${data}`)).data
}

export const create_lead = async(data)=>{
  return (await axiosInstance.post(`create_lead?mdl=${switchStore.pageId}`,data)).data
}
