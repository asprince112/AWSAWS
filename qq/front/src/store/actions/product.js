import Axios from "axios";
import { getCookie } from "commons/getcookie";

export const createProduct = (product) => {
    const res = Axios
        .create({
            baseURL: "http://127.0.0.1:8000/api/",
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            }
        })
        .post('', product)
        .catch(err => {
            console.log(err);
        });
    return res
}

export const updateProduct = (id, product) => {
    const res = Axios
        .create({
            baseURL: "http://127.0.0.1:8000/api/",
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            }
        })
        .put(id + "/", product)
        .catch(err => {
            console.log(err);
        });
    return res
}

export const deleteProduct = (id) => {
    const res = Axios
        .create({
            baseURL: "http://127.0.0.1:8000/api/",
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            }
        })
        .delete(id + "/")
        .catch(err => {
            console.log(err);
        });
    return res
}
  