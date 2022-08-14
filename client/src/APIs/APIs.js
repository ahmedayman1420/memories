import axios from "axios";
const baseURL = "http://localhost:5000/";

export const submitPost = async (post) => {
  try {
    const res = await axios.post(`${baseURL}post/add`, post);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${baseURL}posts`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
