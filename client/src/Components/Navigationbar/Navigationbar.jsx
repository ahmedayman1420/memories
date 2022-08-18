import React, { useEffect, useState } from "react";
import Style from "../Home/Home.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../Redux/Actions/actions";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navigationbar() {
  const dispatch = useDispatch();
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    try {
      var decoded = jwt_decode(memoryProfile?.token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        dispatch(logOutAction());
        navigate("/auth", { replace: true });
      }
      setUser(decoded?.data || decoded);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }, [location]);

  return (
    <>
      <Navbar
        className={[Style.titleContainer, "w-75 m-auto p-2 mt-4"].join(" ")}
        bg="light"
        expand="lg"
      >
        <Container>
          <Navbar.Brand
            className="d-flex align-items-center"
            as={NavLink}
            to="/"
          >
            <h3 className={["title text-info"].join(" ")}>Memories</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user && (
                <div className="d-flex align-items-center">
                  {user.picture && (
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                      src={user.picture}
                      alt=""
                    />
                  )}
                  {user.name}
                </div>
              )}
              {user && (
                <Nav.Link
                  onClick={() => {
                    dispatch(logOutAction());
                  }}
                  className="d-flex align-items-center text-info"
                  as={NavLink}
                  to="/auth"
                >
                  LOG OUT
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link
                  className="d-flex align-items-center text-info"
                  as={NavLink}
                  to="/auth"
                >
                  SIGN IN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
