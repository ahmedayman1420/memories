import Style from "./App.scss";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./Components/Authentication/Authentication";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function App() {

  const [visible, setVisible] = useState(false);
  const googleAuth = useSelector((state) => state.googleAuth);
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
              path="/home"
              element={<Navigate to="/posts" replace={true} />}
            />
            <Route exact path="/posts/search" element={<Home />} />
          </Route>

          <Route path="/auth" element={<Authentication />} />
          <Route
            exact
            path="/"
            element={<Navigate to="/auth" replace={true} />}
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>

        <FontAwesomeIcon
          className="position-fixed"
          style={{
            display: visible ? "inline" : "none",
            right: "3%",
            bottom: "3%",
            color: "black",
            cursor: "pointer",
          }}
          size="2x"
          icon={faArrowCircleUp}
          onClick={scrollToTop}
        />
      </div>
    </>
  );
}

export default App;
