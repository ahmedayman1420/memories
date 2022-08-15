import React from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
import Style from "./Home.module.scss";
import Posts from "../Posts/Posts";

function Home() {
  return (
    <>
      <div className="py-5">
        <div className="postBody mt-5 py-5">
          <div className="container">
            <AddPostForm className="mb-5" />
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
