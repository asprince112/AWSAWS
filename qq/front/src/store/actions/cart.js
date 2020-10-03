import Axios from "axios";
import { getCookie } from "commons/getcookie";

export const getCartAmount = async () => {
    const res = await Axios
    .create({
      baseURL: "http://127.0.0.1:8000/products/",
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    })
      .post("get-car-num/", {
        token: localStorage.getItem("token"),
        actionType: 'getCartNum'
      })
      .catch(err => {
        console.log(err);
      });
    return res.data
}

export const getCartInfo = () => {
  const res = Axios
    .create({
      baseURL: "http://127.0.0.1:8000/products/",
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    })
      .post("get-cart-info/", {
        token: localStorage.getItem("token"),
        actionType: 'getCartInfo'
      })
      .catch(err => {
        console.log(err);
      });
  return res
}

export const addToCart = (id) => {
  const res = Axios
    .create({
      baseURL: "http://127.0.0.1:8000/products/",
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    })
      .post("cart-info-update/", {
        token: localStorage.getItem("token"),
        actionType: "addToCart",
        id: id,
      })
      .catch(err => {
        console.log(err);
      });
  return res
}

export const deleteFromCart = (id) => {
  const res = Axios
    .create({
      baseURL: "http://127.0.0.1:8000/products/",
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    })
      .post("cart-info-update/", {
        token: localStorage.getItem("token"),
        actionType: "deleteFromCart",
        id: id,
      })
      .catch(err => {
        console.log(err);
      });
  return res
}

export const updateCartQuantity = (id, quantity) => {
  const res = Axios
    .create({
      baseURL: "http://127.0.0.1:8000/products/",
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    })
      .post("cart-info-update/", {
        token: localStorage.getItem("token"),
        actionType: "updateQuantity",
        id: id,
        quantity: quantity
      })
      .catch(err => {
        console.log(err);
      });
  return res
}