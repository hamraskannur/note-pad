import { api } from "@/utils/Apis";

export const signUp = async (formData) => {
  try {
    const { data } = await api.post("auth/signup", formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifySignUp = async (token) => {
  try {
    const { data } = await api.put(`auth/verify/${token}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};


export const userLogin = async (formData) => {
    try {
      const { data } = await api.post("auth/login", formData);
      return data;
    } catch (error) {
console.log(error.response.data);
      return error.response.data;
    }
  };
  

