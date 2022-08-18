import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostsAction } from "../../Redux/Actions/actions";
import PaginationPosts from "../PaginationPosts/PaginationPosts";
import Post from "./Post/Post";

function Posts() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const fetchMyAPI = async () => {
      setWaiting(true);
      await dispatch(getPostsAction());
      setWaiting(false);
    };
    fetchMyAPI();
  }, []);

  return (
    <>
      {waiting && <h1>Wait ...</h1>}
      {!waiting && (
        <div>
          <Post /> <PaginationPosts />
        </div>
      )}
    </>
  );
}

export default Posts;
