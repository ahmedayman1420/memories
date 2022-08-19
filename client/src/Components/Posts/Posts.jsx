import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostsAction, serachPostAction } from "../../Redux/Actions/actions";
import PaginationPosts from "../PaginationPosts/PaginationPosts";
import Post from "./Post/Post";

function Posts() {
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(true);
  let navigate = useNavigate();
  let location = useLocation();
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        setWaiting(true);
        if (location.pathname !== "/posts/search")
          await dispatch(getPostsAction());
        else {
          // If search post, get search post data
          const params = new Proxy(
            new URLSearchParams(window.location.search),
            {
              get: (searchParams, prop) => searchParams.get(prop),
            }
          );
          let titles = params.titles.split(",");
          let tags = params.tags.split(",");
          setWaiting(true);
          await dispatch(serachPostAction(titles, tags, memoryProfile));
        }
        setWaiting(false);
      } catch (error) {
        localStorage.clear();
        navigate("/auth", { replace: true });
      }
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
