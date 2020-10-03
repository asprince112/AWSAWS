import axios from "axios";
import { getCookie } from "commons/getcookie";

const endpoint = "http://127.0.0.1:8000/"


// const csrftoken = getCookie('csrftoken');
// const csrftoken = Cookies.get('csrftoken')

export const authAxios = axios.create({
  baseURL: endpoint + "api/",
  headers: {
    "X-CSRFToken": getCookie('csrftoken')
  }
});

export const userAxios = axios.create({
  baseURL: endpoint + "products/",
  headers: {
    "X-CSRFToken": getCookie('csrftoken')
  }
});

export const Axios = axios.create({
  baseURL: endpoint,
  headers: {
    "X-CSRFToken": getCookie('csrftoken')
  }
});