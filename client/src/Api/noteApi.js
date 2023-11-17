import { api } from "@/utils/Apis";

export const addNote = async (formData) => {
  try {
    const { data } = await api.post("user/createNote", formData);
    return data;
  } catch (error) {
    return error.message;
  }
};


export const getAllNotes = async () => {
    try {
      const { data } = await api.get("user/getAllNotes");
      return data;
    } catch (error) {
      return error.message;
    }
  };


  export const getNote = async (id) => {
    try {
      const { data } = await api.get(`user/note/${id}`);
      return data;
    } catch (error) {
      return error.message;
    }
  };

  export const noteUpdate = async (formData) => {
    try {
      const { data } = await api.put(`user/noteUpdate`,formData);
      return data;
    } catch (error) {
      return error.message;
    }
  };


  


  