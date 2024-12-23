


// const image_upload_url = "https://api.letslegislate.in/"
// export const Image_url = "https://api.letslegislate.in/uploads/"

import axiosInstance from "./APIintercepter";


export const userLogin = async (data) => {
  return (await axiosInstance.post(`userLogin`,data)).data;
};