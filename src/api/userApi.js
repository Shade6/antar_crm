// const image_upload_url = "https://api.letslegislate.in/"
import { USER_API } from "./EndPoint";
import axios from "axios";
import axiosInstance from "./APIintercepter";

// Ensure there is an active Pinia instance
let switchStore = () => {
  const data = JSON.parse(localStorage.getItem("switch"));
  return data;
};

export const create_images = async (data) => {
  return (
    await axios.post(
      `${USER_API}create_image?mdl=${switchStore().pageId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    )
  ).data;
};
export const create_file_pdf = async (data, id, estimate_id) => {
  return (
    await axios.post(
      `${USER_API}create_file_pdf?mdl=${switchStore().pageId}&&id=${id}&&estimate_id=${estimate_id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    )
  ).data;
};

export const userLogin = async (data) => {
  return (await axiosInstance.post(`login`, data)).data;
};

export const menu = async (data) => {
  return (await axiosInstance.get(`menu?role_id=${data}`)).data;
};

export const findAllUsers = async (data) => {
  return (await axiosInstance.get(`get_all_user?mdl=${switchStore().pageId}`))
    .data;
};

export const findAllRole = async (data) => {
  return (await axiosInstance.get(`get_all_role?mdl=${switchStore().pageId}`))
    .data;
};

export const findAllPermission = async (data) => {
  return (
    await axiosInstance.get(
      `get_all_module_permission?mdl=${switchStore().pageId}`
    )
  ).data;
};

export const findAllModule = async (data) => {
  return (await axiosInstance.get(`get_all_module?mdl=${switchStore().pageId}`))
    .data;
};

export const create_user = async (data) => {
  return (
    await axiosInstance.post(`create_user?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const create_role = async (data) => {
  return (
    await axiosInstance.post(`create_role?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const create_permission = async (data) => {
  return (
    await axiosInstance.post(
      `create_permission?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_module = async (data) => {
  return (
    await axiosInstance.post(`create_module?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const findAllRolePermission = async (data) => {
  return (
    await axiosInstance.get(
      `find_all_role_permissions?mdl=${switchStore().pageId}&&role=${data}`
    )
  ).data;
};

export const permission_giver = async (data) => {
  return (
    await axiosInstance.put(
      `permission_giver?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_industry = async (data) => {
  return (
    await axiosInstance.post(
      `create_industry?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const find_all_industry = async (data) => {
  return (
    await axiosInstance.get(
      `find_all_industry?mdl=${switchStore().pageId}&&role=${data}`
    )
  ).data;
};

export const create_territory = async (data) => {
  return (
    await axiosInstance.post(
      `create_territory?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const find_all_territories = async (data) => {
  return (
    await axiosInstance.get(
      `find_all_territories?mdl=${switchStore().pageId}&&role=${data}`
    )
  ).data;
};

export const find_one_territory = async (data) => {
  return (
    await axiosInstance.get(
      `find_one_territory?mdl=${switchStore().pageId}&&territory_id=${data}`
    )
  ).data;
};

export const update_territory = async (data) => {
  return (
    await axiosInstance.put(
      `update_territory?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const find_all_lead = async (data) => {
  console.log(switchStore().pageId, "===========================");
  return (
    await axiosInstance.get(
      `get_leads?mdl=${switchStore().pageId}&&role=${data}`
    )
  ).data;
};

export const update_single_lead = async (data) => {
  return (
    await axiosInstance.put(
      `update_single_lead?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_lead = async (data) => {
  return (
    await axiosInstance.post(`create_lead?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const find_single_lead = async (data) => {
  return (
    await axiosInstance.get(
      `find_single_lead?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const find_assignees = async (data) => {
  return (
    await axiosInstance.get(
      `find_assignees?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const update_lead_assignee = async (data) => {
  return (
    await axiosInstance.put(
      `update_lead_assignee?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_email_account = async (data) => {
  return (
    await axiosInstance.post(`create_email?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const find_all_email = async () => {
  return (await axiosInstance.get(`find_all_email?mdl=${switchStore().pageId}`))
    .data;
};

export const create_lead_attachment = async (data, lead_id) => {
  return (
    await axios.post(
      `${USER_API}create_lead_attachment?mdl=${switchStore().pageId}&&lead_id=${lead_id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    )
  ).data;
};

export const get_attachment_by_lead_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_attachment_by_lead_id?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const create_lead_comment = async (data) => {
  return (
    await axiosInstance.post(
      `create_lead_comment?mdl=${switchStore().pageId}&&lead_id=${data?.lead_id || null}`,
      data
    )
  ).data;
};

export const get_lead_comment_by_lead_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_lead_comment_by_lead_id?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const create_lead_note_attachment = async (data) => {
  return (
    await axiosInstance.post(
      `create_lead_note_attachment?mdl=${switchStore().pageId}&&lead_id=${data?.lead_id || null}`,
      data
    )
  ).data;
};

export const get_lead_note_by_lead_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_lead_note_by_lead_id?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const create_lead_task = async (data) => {
  return (
    await axiosInstance.post(
      `create_lead_task?mdl=${switchStore().pageId}&&lead_id=${data?.lead_id || null}`,
      data
    )
  ).data;
};

export const get_lead_task_by_lead_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_lead_task_by_lead_id?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const findUserById = async (data) => {
  return (
    await axiosInstance.get(
      `findUserById?mdl=${switchStore().pageId}&&u_id=${data}`
    )
  ).data;
};

export const find_user_created_email = async (data) => {
  return (
    await axiosInstance.get(
      `find_user_created_email?mdl=${switchStore().pageId}&&u_id=${data}`
    )
  ).data;
};

export const find_selected_user_email = async (data) => {
  return (
    await axiosInstance.get(
      `find_selected_user_email?mdl=${switchStore().pageId}&&user_id=${data}`
    )
  ).data;
};

export const create_email_user_email = async (data) => {
  return (
    await axiosInstance.post(
      `create_email_user_email?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const get_lead_scoring_rules = async (data) => {
  return (
    await axiosInstance.get(
      `get_lead_scoring_rules?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const create_lead_scoring_rules = async (data) => {
  return (
    await axiosInstance.post(
      `create_lead_scoring_rules?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const delete_lead = async (data) => {
  const formattedData = Array.from(data).join(",");
  return (
    await axiosInstance.delete(
      `delete_lead?mdl=${switchStore().pageId}&&id=${formattedData}`
    )
  ).data;
};

export const delete_lead_comment = async (data) => {
  return (
    await axiosInstance.delete(
      `delete_lead_comment?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const update_lead_comment = async (data) => {
  return (
    await axiosInstance.put(
      `update_lead_comment?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const delete_lead_task = async (data) => {
  return (
    await axiosInstance.delete(
      `delete_lead_task?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const update_lead_task = async (data) => {
  return (
    await axiosInstance.put(
      `update_lead_task?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const update_lead_note = async (data) => {
  return (
    await axiosInstance.put(
      `update_lead_note?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const delete_lead_note = async (data) => {
  return (
    await axiosInstance.delete(
      `delete_lead_note?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const delete_lead_attachment = async (data) => {
  return (
    await axiosInstance.delete(
      `delete_lead_attachment?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const remove_lead_assignee = async (data) => {
  return (
    await axiosInstance.delete(
      `remove_lead_assignee?mdl=${switchStore().pageId}&&lead_id=${data.lead_id}&&id=${data.id}`
    )
  ).data;
};

export const find_all_lead_by_search = async (data) => {
  console.log(data);
  return (
    await axiosInstance.get(
      `find_all_lead_by_search?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const get_lead_activity = async (data) => {
  return (
    await axiosInstance.get(
      `get_lead_activity?mdl=${switchStore().pageId}&&lead_id=${data}`
    )
  ).data;
};

export const create_deal = async (data) => {
  return (
    await axiosInstance.post(
      `create_opportunity?mdl=${switchStore()?.pageId || ""}`,
      data
    )
  ).data;
};


export const get_all_deal = async (data) => {
  return (
    await axiosInstance.get(
      `get_opportunity?mdl=${switchStore()?.pageId || ""}&&role=${data}`
    )
  ).data;
};

export const create_contact = async (data) => {
  return (
    await axiosInstance.post(`create_contact?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const get_all_contact = async (data) => {
  return (
    await axiosInstance.get(
      `get_contacts?mdl=${switchStore()?.pageId || ""}&&role=${data}`
    )
  ).data;
};

export const create_organization = async (data) => {
  return (
    await axiosInstance.post(
      `create_organization?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const get_all_organization = async (data) => {
  return (
    await axiosInstance.get(
      `get_organization?mdl=${switchStore()?.pageId || ""}`
    )
  ).data;
};

export const create_address = async (data) => {
  return (
    await axiosInstance.post(`create_address?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const get_all_address = async (data) => {
  return (await axiosInstance.get(`get_address?mdl=${switchStore().pageId}`))
    .data;
};

export const delete_contact = async (data) => {
  const formattedData = Array.from(data).join(",");
  return (
    await axiosInstance.delete(
      `delete_contact?mdl=${switchStore().pageId}&&id=${formattedData}`
    )
  ).data;
};

export const delete_deal = async (data) => {
  const formattedData = Array.from(data).join(",");
  return (
    await axiosInstance.delete(
      `delete_opportunity?mdl=${switchStore().pageId}&&id=${formattedData}`
    )
  ).data;
};

export const delete_organization = async (data) => {
  const formattedData = Array.from(data).join(",");
  return (
    await axiosInstance.delete(
      `delete_organization?mdl=${switchStore().pageId}&&id=${formattedData}`
    )
  ).data;
};

export const get_single_opportunity = async (data) => {
  return (
    await axiosInstance.get(
      `get_opportunity_by_id?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const get_single_organization = async (data) => {
  return (
    await axiosInstance.get(
      `get_organization_by_id?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const contact_details_by_id = async (data) => {
  return (
    await axiosInstance.get(
      `contact_details_by_id?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};
export const get_contact_by_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_contact_by_id?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};
export const get_only_organization_by_id = async (data) => {
  return (
    await axiosInstance.get(
      `get_only_organization_by_id?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const update_contact = async (data) => {
  return (
    await axiosInstance.put(`update_contact?mdl=${switchStore().pageId}`, data)
  ).data;
};
export const update_organization = async (data) => {
  return (
    await axiosInstance.put(
      `update_organization?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_address_org = async (data) => {
  return (
    await axiosInstance.post(
      `create_address_org?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const create_address_contact = async (data) => {
  return (
    await axiosInstance.post(
      `create_address_contact?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};
export const get_all_address_org = async () => {
  return (
    await axiosInstance.get(`get_all_address_org?mdl=${switchStore().pageId}`)
  ).data;
};

export const get_all_address_contact = async () => {
  return (
    await axiosInstance.get(
      `get_all_address_contact?mdl=${switchStore().pageId}`
    )
  ).data;
};

export const create_product = async (data) => {
  return (
    await axiosInstance.post(`create_product?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const get_all_product = async (data) => {
  return (
    await axiosInstance.get(
      `get_all_product?mdl=${switchStore().pageId}&&role=${data}`
    )
  ).data;
};

export const get_single_product = async (data) => {
  return (
    await axiosInstance.get(
      `get_single_product?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const update_product = async (data) => {
  return (
    await axiosInstance.put(`update_product?mdl=${switchStore().pageId}`, data)
  ).data;
};

export const delete_product = async (data) => {
  const formattedData = Array.from(data).join(",");
  return (
    await axiosInstance.delete(
      `delete_product?mdl=${switchStore().pageId}&&id=${formattedData}`
    )
  ).data;
};
export const create_extra_contact = async (data) => {
  return (
    await axiosInstance.post(
      `create_extra_contact?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const find_extra_contact = async (data) => {
  return (
    await axiosInstance.get(
      `find_extra_contacts?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const handle_remove_extra_contact = async (data) => {
  return (
    await axiosInstance.delete(
      `handle_remove_extra_contact?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const get_existing_org_estimate = async (data) => {
  return (
    await axiosInstance.get(
      `get_existing_org_estimate?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const find_all_estimate = async () => {
  return (
    await axiosInstance.get(`find_all_estimate?mdl=${switchStore().pageId}`)
  ).data;
};

export const create_estimate = async (data) => {
  return (
    await axiosInstance.post(
      `create_estimate?mdl=${switchStore().pageId}`,
      data
    )
  ).data;
};

export const pdf_estimate_details = async (data, id) => {
  return (
    await axiosInstance.get(
      `pdf_estimate_details?mdl=${switchStore().pageId}&&id=${data}&&opportunity_id=${id}`
    )
  ).data;
};

export const find_pdf = async (data, id) => {
  return (
    await axiosInstance.get(`find_pdf?mdl=${switchStore().pageId}&&id=${data}`)
  ).data;
};

export const fetch_org_estimate = async (data) => {
  return (
    await axiosInstance.get(
      `fetch_org_estimate?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const find_dashboard = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard?mdl=${switchStore().pageId}&&timeframe=${"24h"}`
    )
  ).data;
};

export const dashboard_header = async (data) => {
  return (
    await axiosInstance.get(
      `dashboard_header?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const find_dashboard_new_lead = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_new_lead?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};
export const find_dashboard_new_opportunity = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_new_opportunity?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};
export const find_dashboard_project_revenue = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_project_revenue?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};
export const find_dashboard_industry_classification = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_industry_classification?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};
export const find_dashboard_revenue_ = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_revenue_?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};
export const find_dashboard_top_5_territory = async (data) => {
  return (
    await axiosInstance.get(
      `find_dashboard_top_5_territory?mdl=${switchStore().pageId}&&timeframe=${data}`
    )
  ).data;
};

export const contact_filter = async (data) => {
  return (
    await axiosInstance.get(
      `contact_filter?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const contact_find_by_name = async (data) => {
  return (
    await axiosInstance.get(
      `contact_find_by_name?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const opportunity_filter = async (data) => {
  return (
    await axiosInstance.get(
      `opportunity_filter?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const opportunity_find_by_name = async (data) => {
  return (
    await axiosInstance.get(
      `opportunity_find_by_name?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const organization_filter = async (data) => {
  return (
    await axiosInstance.get(
      `organization_filter?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const organization_find_by_name = async (data) => {
  return (
    await axiosInstance.get(
      `organization_find_by_name?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const estimate_filter = async (data) => {
  return (
    await axiosInstance.get(
      `estimate_filter?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const estimate_find_by_name = async (data) => {
  return (
    await axiosInstance.get(
      `estimate_find_by_name?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const product_filter = async (data) => {
  return (
    await axiosInstance.get(
      `product_filter?mdl=${switchStore().pageId}&&search=${data.text}&field=${data.field?.value}&type=${data.type?.value}&sort_field=${data.sort_field?.value}&sort_order=${data.sort_order?.value}`
    )
  ).data;
};

export const product_find_by_name = async (data) => {
  return (
    await axiosInstance.get(
      `product_find_by_name?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};

export const find_status_of_lead = async (data) => {
  return (
    await axiosInstance.get(
      `find_status_of_lead?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};


export const update_lead_status = async (id,data) => {
  return (
    await axiosInstance.put(`update_lead_status?mdl=${switchStore().pageId}&&id=${id}&&status=${data}`)
  ).data;
};



export const find_status_of_opportunity = async (data) => {
  return (
    await axiosInstance.get(
      `find_status_of_opportunity?mdl=${switchStore().pageId}&&id=${data}`
    )
  ).data;
};


export const update_opportunity_status = async (id,data) => {
  return (
    await axiosInstance.put(`update_opportunity_status?mdl=${switchStore().pageId}&&id=${id}&&status=${data}`)
  ).data;
};


export const convert_lead = async (data) => {
  return (
    await axiosInstance.post(
      `convert_lead?mdl=${switchStore()?.pageId || ""}`,
      data
    )
  ).data;
};



export  const createTenantInSuperset=async()=>
  {
    const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5MDMyMTI3LCJqdGkiOiI0MWZjZjVlYi03YjE3LTRmYWEtOTg1Ny04Mzc0MGRiMDAzMWIiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3MzkwMzIxMjcsImNzcmYiOiJjODhkNWFlMS05YTAxLTRjNTMtYTgxMi01ZDM3NWE5YzdhZTgiLCJleHAiOjE3MzkwMzMwMjd9.lt7huKA--FNujRc5OajmqJnqLyvxM4lWzro2d_r8ibs";

    const tenantId = "70c5e766-84f7-40df-97a8-180ac557ffda"
    const userEmail = "www.vidhulprasad@gmail.com"
  
  try {

    console.log('starting the functions')
   const first = await axios.post(
      "https://superset.shade6.com/api/v1/roles/",
      {
        name: `Tenant_${tenantId}`,
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log(first,'this is hte the first data')
   
    // 2️⃣ Create User
   const second = await axios.post(
      "https://superset.shade6.com/api/v1/user/",
      {
        username: `tenant${tenantId}_user`,
        first_name: "New",
        last_name: "Tenant",
        email: userEmail,
        role: [`Tenant_${tenantId}`],
        password: "securepassword",
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log(second,'this is hte the second data')
    // 3️⃣ Apply RLS Rule
    const third = await axios.post(
      "https://superset.shade6.com/api/v1/rls/",
      {
        name: `Tenant_${tenantId}_RLS`,
        clause: `tenant_id = ${tenantId}`,
        tables: [1, 2], // IDs of the tables in Superset
        roles: [`Tenant_${tenantId}`],
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log(`✅ Tenant ${tenantId} created successfully in Superset`);
    return res.json({message:`✅ Tenant ${tenantId} created successfully in Superset`,statusCode:200,data:tenantId})
  } catch (error) {
      return res.json({message:error.message,data: error.response?.data || error.message})
   
  }
}