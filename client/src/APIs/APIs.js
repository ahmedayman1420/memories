import axios from "axios";
const baseURL = "http://localhost:5000/";

export const submitPost = async (post) => {
  try {
    post.tags = post.tags.filter((element) => {
      if (element.length !== 0) {
        return true;
      }
      return false;
    });
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

export const editPostAPI = async (post) => {
  try {
    const res = await axios.put(`${baseURL}post/edit/${post._id}`, {
      creator: post.creator,
      title: post.title,
      message: post.message,
      tags: post.tags.filter((element) => {
        if (element.length !== 0) {
          return true;
        }
        return false;
      }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
