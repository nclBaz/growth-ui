import axios from "axios";

//CONVERTS FILES TO BASE64
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const identifyPlant = async (file) => {
  const data = {
    api_key: process.env.PLANTID_API_KEY,
    images: [file],
    modifiers: ["similar_images"],
    plant_language: "en",
    plant_details: [
      "common_names",
      "url",
      "name_authority",
      "wiki_description",
    ],
  };
  const response = await axios(process.env.PLANTID_API_URL, {
    method: "POST",
    data,
  });
  return response.data;
};
