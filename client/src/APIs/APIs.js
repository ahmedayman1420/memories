import axios from "axios";
const baseURL = "http://localhost:5000/";

export const submitPost = async (post) => {
  try {
    const res = await axios.post(`${baseURL}post/add`, post);
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};
