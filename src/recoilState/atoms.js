import { atom } from "recoil";

export const client = atom({
  key: "client",
  default: { login: false, client: null },
});

export const blogPosts = atom({
  key: "blogPosts",
  default: null,
});

export const device = atom({
  key: "device",
  default: "",
});

export const envData = atom({
  key: "environmentData",
  default: { currentTemp: 0, currentHum: 0, currentMoist: 0 },
});
