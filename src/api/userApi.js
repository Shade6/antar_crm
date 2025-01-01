


// const image_upload_url = "https://api.letslegislate.in/"
// export const Image_url = "https://api.letslegislate.in/uploads/"

import axiosInstance from "./APIintercepter";


export const userLogin = async (data) => {
  return (await axiosInstance.post(`login`,data)).data;
};

export const menu = async(data)=>{
  return(await axiosInstance.get(`menu?role_id=${data}`)).data;
}