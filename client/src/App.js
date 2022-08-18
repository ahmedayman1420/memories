import Style from "./App.scss";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./Components/Authentication/Authentication";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function App() {
  // const posts = useSelector((state) => state.posts);
  // console.log({ posts });

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <div className="position-relative">
        <Navigationbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/posts" element={<Home />} />
            <Route
              exact
              path="/"
              element={<Navigate to="/posts" replace={true} />}
            />
            <Route
              exact
              path="/home"
              element={<Navigate to="/posts" replace={true} />}
            />
          </Route>

          <Route path="/auth" element={<Authentication />} />
          <Route path="/*" element={<Navigate to="/" replace={true} />} />
        </Routes>

        
        <FontAwesomeIcon
          className="position-fixed"
          style={{
            display: visible ? "inline" : "none",
            right: "3%",
            bottom: "3%",
            color: "#09c",
            cursor: "pointer",
          }}
          size="3x"
          icon={faArrowCircleUp}
          onClick={scrollToTop}
        />
      </div>
    </>
  );
}

export default App;
