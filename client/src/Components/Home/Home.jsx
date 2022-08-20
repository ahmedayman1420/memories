import React from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
import Style from "./Home.module.scss";
import Posts from "../Posts/Posts";
import SearchPost from "../SearchPost/SearchPost";

function Home() {
  return (
    <>
      <div className="py-5">
        <div className="postBody mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 mb-5">
                <AddPostForm className="mb-5" />
              </div>
              <div className="col-md-6 mb-5">
                <SearchPost className="mb-5" />
              </div>
            </div>
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
