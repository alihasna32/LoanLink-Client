import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data?.data?.display_url;
};

// save or update user in db
export const saveOrUpdateUser = async (userData) => {
  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) {
    throw new Error("VITE_API_URL is not defined in .env file");
  }

  // Remove trailing slash from baseURL if it exists, then append /user
  const url = `${baseURL.replace(/\/+$/, '')}/user`;

  const { data } = await axios.post(url, userData);
  return data;
};
