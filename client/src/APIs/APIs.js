import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL = "http://localhost:5000/";

export const addPostAPI = async (post, googleAuth) => {
  try {
    post.tags = post.tags.filter((element) => {
      if (element.length !== 0) {
        return true;
      }
      return false;
    });
    const res = await axios.post(`${baseURL}post/add`, post, {
      headers: {
        authorization: `Bearer ${googleAuth.token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostsAPI = async (page) => {
  try {
    const res = await axios.get(`${baseURL}posts?page=${page}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPostAPI = async (id, googleAuth) => {
  try {
    const res = await axios.get(`${baseURL}post/detail/${id}`, {
      headers: {
        authorization: `Bearer ${googleAuth.token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editPostAPI = async (post, googleAuth) => {
  try {
    const res = await axios.put(
      `${baseURL}post/edit/${post._id}`,
      {
        userId: post.creator,
        postName: post.postName,
        title: post.title,
        message: post.message,
        tags: post.tags.filter((element) => {
          if (element.length !== 0) {
            return true;
          }
          return false;
        }),
      },
      {
        headers: {
          authorization: `Bearer ${googleAuth.token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAPI = async (post, googleAuth) => {
  try {
    const res = await axios.delete(`${baseURL}post/delete/${post._id}`, {
      headers: {
        authorization: `Bearer ${googleAuth.token}`,
      },
      data: {
        userId: post.creator,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likePostAPI = async (post, googleAuth) => {
  try {
    const res = await axios.patch(
      `${baseURL}post/like/${post._id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${googleAuth.token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const searchPostAPI = async (titles, tags, googleAuth, page) => {
  try {
    const res = await axios.get(
      `${baseURL}post/search?titles=${titles}&tags=${tags}&page=${page}`,
      {
        headers: {
          authorization: `Bearer ${googleAuth.token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signUpAPI = async (user) => {
  try {
    const res = await axios.post(`${baseURL}user/signup`, user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signInAPI = async (user) => {
  try {
    const res = await axios.post(`${baseURL}user/signin`, {
      email: user.email,
      password: user.password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const googleSigninAPI = async (token) => {
  try {
    var decoded = jwt_decode(token);
    const res = await axios.post(`${baseURL}google`, {
      email: decoded.email,
      name: decoded.name,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addCommentAPI = async (comment, id, googleAuth) => {
  try {
    const res = await axios.post(
      `${baseURL}post/comment/${id}`,
      { comment },
      {
        headers: {
          authorization: `Bearer ${googleAuth.token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
