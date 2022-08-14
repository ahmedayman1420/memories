import React from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
import memoriesImg from "../../Images/memories.jpg";
import Style from "./Home.module.scss";
import Posts from "../Posts/Posts";

function Home() {
  return (
    <>
      <div
        className={[Style.titleContainer, "w-75 m-auto p-3 mt-4 "].join(" ")}
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-2">
            <h2 className={["title text-dark"].join(" ")}>Memories</h2>
          </div>
          <div className="col-lg-2">
            <img className="w-50" src={memoriesImg} alt="" />
          </div>
        </div>
      </div>

      <div className="postBody mt-5">
        <div className="container">
          <AddPostForm className='mb-5'/>
          <Posts />
        </div>
      </div>
    </>
  );
}

export default Home;