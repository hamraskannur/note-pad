import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use((req) => {
    const token=localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }
  console.log(req.headers.Authorization);
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
    //   const { status } = error.response;
    //   if (status === 401) {
    //     localStorage.clear();
    //     window.location.href = "/login";
    //   } else if (status === 500) {
    //     window.location.href = "/500page";
    //   } else {
    //     window.location.href = "/*";
    //   }
    }
    return Promise.reject(error);
  }
);
