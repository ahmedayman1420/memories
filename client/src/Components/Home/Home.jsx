import React from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
import memoriesImg from "../../Images/child_walk_forest_128464_2560x1600.jpg";
import Style from "./Home.module.scss";
import Posts from "../Posts/Posts";

function Home() {
  return (
    <>
      <div
        className={[Style.titleContainer, "w-75 m-auto p-3 mt-4 "].join(" ")}
      >
        <div className="row justify-content-center align-items-center text-center">
          <h1 className={["title text-info"].join(" ")}>Memories</h1>
        </div>
      </div>

      <div className="postBody mt-5">
        <div className="container">
          <AddPostForm className="mb-5" />
          <Posts />
        </div>
      </div>
    </>
  );
}

export default Home;
