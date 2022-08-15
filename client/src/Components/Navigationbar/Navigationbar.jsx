import React from "react";
import Style from "../Home/Home.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Navigationbar() {
  return (
    <>
        <Navbar
          className={[Style.titleContainer, "w-75 m-auto p-2 mt-4"].join(" ")}
          fixed="top"
          bg="light"
          expand="lg"
        >
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              <h3 className={["title text-info"].join(" ")}>Memories</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/auth">
                  SIGN IN
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}

export default Navigationbar;
