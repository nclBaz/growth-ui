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
    api_key: "UWFQcA5iCWJ8sd51h94GbQ6LmTwCfuZtel1U8q8vunxefsQNEy",
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
  const response = await axios("https://api.plant.id/v2/identify", {
    method: "POST",
    data,
  });
  return response.data;
};

//MAKES A SEARCH REQUEST
export const plantsBySearch = async (searchKey) => {
  const head = {
    method: "GET",
    url: `http://localhost:3001/api/search?search=${searchKey}`,
  };
  const response = await axios(head);

  return response.data;
};

export const plantById = async (id) => {
  const head = {
    method: "GET",
    url: `http://localhost:3001/api/plants/?id=${id}`,
  };
  const response = await axios(head);

  return response.data;
};
