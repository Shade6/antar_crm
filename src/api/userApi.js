


// const image_upload_url = "https://api.letslegislate.in/"
// export const Image_url = "https://api.letslegislate.in/uploads/"
import { USER_API } from "./EndPoint";
import axios from "axios";
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

export const find_single_lead = async(data)=>{
  return (await axiosInstance.get(`find_single_lead?mdl=${switchStore.pageId}&&id=${data}`)).data
}

export const find_assignees = async(data)=>{
  return (await axiosInstance.get(`find_assignees?mdl=${switchStore.pageId}&&id=${data}`)).data
}


export const update_lead_assignee = async(data)=>{
  return (await axiosInstance.put(`update_lead_assignee?mdl=${switchStore.pageId}`,data)).data
}


export const create_email_account = async(data)=>{
  return (await axiosInstance.post(`create_email?mdl=${switchStore.pageId}`,data)).data
}


export const find_all_email = async()=>{
  return (await axiosInstance.get(`find_all_email?mdl=${switchStore.pageId}`)).data
}


export const create_lead_attachment = async(data,lead_id)=>{

  return (await axios.post(`${USER_API}create_lead_attachment?mdl=${switchStore.pageId}&&lead_id=${lead_id}`,data,{
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `${localStorage.getItem("token")}`,
    },  
  })).data
}

export const get_attachment_by_lead_id = async(data)=>{
  return (await axiosInstance.get(`get_attachment_by_lead_id?mdl=${switchStore.pageId}&&lead_id=${data}`)).data
}


export const create_lead_comment = async(data)=>{
  return (await axiosInstance.post(`create_lead_comment?mdl=${switchStore.pageId}`,data)).data
}

export const get_lead_comment_by_lead_id = async(data)=>{
  return (await axiosInstance.get(`get_lead_comment_by_lead_id?mdl=${switchStore.pageId}&&lead_id=${data}`)).data
}


export const create_lead_note_attachment = async(data)=>{
  return (await axiosInstance.post(`create_lead_note_attachment?mdl=${switchStore.pageId}`,data)).data
}

export const get_lead_note_by_lead_id = async(data)=>{
  return (await axiosInstance.get(`get_lead_note_by_lead_id?mdl=${switchStore.pageId}&&lead_id=${data}`)).data
}

export const create_lead_task = async(data)=>{
  return (await axiosInstance.post(`create_lead_task?mdl=${switchStore.pageId}`,data)).data
}

export const get_lead_task_by_lead_id = async(data)=>{
  return (await axiosInstance.get(`get_lead_task_by_lead_id?mdl=${switchStore.pageId}&&lead_id=${data}`)).data
}



export const findUserById = async(data)=>{
  return (await axiosInstance.get(`findUserById?mdl=${switchStore.pageId}&&u_id=${data}`)).data
}

export const find_user_created_email = async(data)=>{
  return (await axiosInstance.get(`find_user_created_email?mdl=${switchStore.pageId}&&u_id=${data}`)).data
}

export const find_selected_user_email = async(data)=>{
  return (await axiosInstance.get(`find_selected_user_email?mdl=${switchStore.pageId}&&user_id=${data}`)).data
}

export const create_email_user_email = async(data)=>{
  return (await axiosInstance.post(`create_email_user_email?mdl=${switchStore.pageId}`,data)).data
}


export const get_lead_scoring_rules = async(data)=>{
  return (await axiosInstance.get(`get_lead_scoring_rules?mdl=${switchStore.pageId}&&lead_id=${data}`)).data
}

export const create_lead_scoring_rules = async(data)=>{
  return (await axiosInstance.post(`create_lead_scoring_rules?mdl=${switchStore.pageId}`,data)).data
}

export const delete_lead = async(data)=>{
  const formattedData = Array.from(data).join(',');
  return (await axiosInstance.delete(`delete_lead?mdl=${switchStore.pageId}&&id=${formattedData}`)).data;
}

export const delete_lead_comment = async(data)=>{
  return (await axiosInstance.delete(`delete_lead_comment?mdl=${switchStore.pageId}&&id=${data}`)).data;
}

export const update_lead_comment = async(data)=>{
  return (await axiosInstance.put(`update_lead_comment?mdl=${switchStore.pageId}`,data)).data;
}


export const delete_lead_task = async(data)=>{
  return (await axiosInstance.delete(`delete_lead_task?mdl=${switchStore.pageId}&&id=${data}`)).data;
}
 
export const update_lead_task = async(data)=>{
  return (await axiosInstance.put(`update_lead_task?mdl=${switchStore.pageId}`,data)).data;
}

export const update_lead_note = async(data)=>{
  return (await axiosInstance.put(`update_lead_note?mdl=${switchStore.pageId}`,data)).data;
}

export const delete_lead_note = async(data)=>{
  return (await axiosInstance.delete(`delete_lead_note?mdl=${switchStore.pageId}&&id=${data}`)).data;
}

export const delete_lead_attachment = async(data)=>{
  return (await axiosInstance.delete(`delete_lead_attachment?mdl=${switchStore.pageId}&&id=${data}`)).data;
}

