import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostsAction, serachPostAction } from "../../Redux/Actions/actions";
import Post from "./Post/Post";
import Pagination from "rc-pagination";

function Posts() {
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(true);
  let navigate = useNavigate();
  let location = useLocation();
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  const postCount = useSelector((state) => state.postCount);
  const googleAuth = useSelector((state) => state.googleAuth);

  let [currentPage, setCurrentPage] = useState(1);
  let [parameters, setParameters] = useState({ titles: [], tags: [] });

  const fetchMyAPI = async (page = 1) => {
    try {
      setWaiting(true);
      if (location.pathname === "/posts") {
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });
        let page = params.page;
        if (page) {
          setCurrentPage(Number(page));
        }
        setWaiting(true);
        await dispatch(getPostsAction(page));
      } else if (location.pathname === "/posts/search") {
        // If search post, get search post data
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });
        let titles = params.titles.split(",");
        let tags = params.tags.split(",");
        setParameters({ titles, tags });
        let page = params.page;
        if (page) {
          setCurrentPage(Number(page));
        }
        setWaiting(true);
        await dispatch(serachPostAction(titles, tags, memoryProfile, page));
      }
      setWaiting(false);
    } catch (error) {
      localStorage.clear();
      navigate("/auth", { replace: true });
    }
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let page = params.page;
    if (page) setCurrentPage(Number(page));
    else setCurrentPage(Number(1));
  }, [location]);

  return (
    <>
      {waiting && <h1>Wait ...</h1>}
      {!waiting && (
        <div>
          <Post />
          <div className="d-flex justify-content-center">
            <Pagination
              current={currentPage}
              defaultPageSize={2}
              pageSize={2}
              total={postCount}
              onChange={async (current, pageSize) => {
                const params = new Proxy(
                  new URLSearchParams(window.location.search),
                  {
                    get: (searchParams, prop) => searchParams.get(prop),
                  }
                );
                setCurrentPage(current);
                setWaiting(true);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                // ============ Handle two cases ============= //
                if (location.pathname === "/posts") {
                  await dispatch(getPostsAction(current));
                  navigate(`/posts?page=${current}`, {
                    replace: true,
                  });
                } else if (location.pathname === "/posts/search") {
                  await dispatch(
                    serachPostAction(
                      params.titles,
                      params.tags,
                      googleAuth,
                      current
                    )
                  );
                  navigate(
                    `/posts/search?titles=${params.titles}&tags=${params.tags}&page=${current}`,
                    {
                      replace: true,
                    }
                  );
                }
                setWaiting(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
