import axios from "axios";
const BASE_URL = "https://backendecommerceapp.herokuapp.com/";

const token =
  localStorage.getItem("persist:root") &&
  JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
    ?.currentUser?.authToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-auth-token": token,
  },
});
