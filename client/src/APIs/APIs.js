import axios from "axios";
const baseURL = "http://localhost:5000/";

export const addPostAPI = async (post) => {
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

export const getAllPostsAPI = async () => {
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

export const deletePostAPI = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}post/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likePostAPI = async (id) => {
  try {
    const res = await axios.patch(`${baseURL}post/like/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
