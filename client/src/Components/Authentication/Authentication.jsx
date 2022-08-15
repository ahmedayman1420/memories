import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Navigate } from "react-router-dom";
import Style from "./Authentication.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function Authentication() {
  const baseURL = "https://route-egypt-api.herokuapp.com/";
  let [isSignIn, setIsSignIn] = useState(false);
  let [error, setError] = useState("");
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let [waiting, setWaiting] = useState(false);
  let [success, setSuccess] = useState(false);
  let [passwordShown, setPasswordShown] = useState(false);

  let togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const getUser = ({ target }) => {
    setUser((prevUser) => {
      return { ...prevUser, [target.name]: target.value };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const res = await axios.post(`${baseURL}signup`, user);
    setWaiting(false);
    if (res.data.message === "success") {
      setSuccess(true);
      setError("");
    } else {
      setError(res.data.message);
    }
  };

  console.log(user);

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Form className="w-50" onSubmit={sendData}>
          {!isSignIn && (
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control
                name="first_name"
                type="text"
                placeholder="First name"
                onChange={getUser}
              />
            </Form.Group>
          )}
          {!isSignIn && (
            <Form.Group className="mb-3" controlId="formBasicLirstName">
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Last name"
                onChange={getUser}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={getUser}
            />
          </Form.Group>

          <Form.Group
            className={["mb-3", Style.password].join(" ")}
            controlId="formBasicPassword"
          >
            <Form.Control
              name="password"
              placeholder="Password"
              onChange={getUser}
              type={passwordShown ? "text" : "password"}
            />

            <FontAwesomeIcon
              className={[Style.icon, Style.posswordIcon].join(" ")}
              size="lg"
              icon={passwordShown ? faEye : faEyeSlash}
              onClick={togglePassword}
            />
          </Form.Group>

          {!isSignIn && (
            <Form.Group
              className={["mb-3", Style.confirmPasswrod].join(" ")}
              controlId="formBasicConfirmPassword"
            >
              <Form.Control
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={getUser}
                type={passwordShown ? "text" : "password"}
              />

              <FontAwesomeIcon
                className={[Style.icon, Style.confirmPasswrodIcon].join(" ")}
                size="lg"
                icon={passwordShown ? faEye : faEyeSlash}
                onClick={togglePassword}
              />
            </Form.Group>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          <Button className="w-100 mb-3" variant="info" type="submit">
            {waiting && "Waiting ... "}
            {!waiting && !isSignIn && "Signup"}
            {!waiting && isSignIn && "Signin"}
          </Button>

          {isSignIn && (
            <Alert variant="primary">
              <>
                <span>Don't have an account ?</span>{" "}
                <span
                  className={Style.sign}
                  onClick={() => {
                    setIsSignIn(false);
                  }}
                >
                  Sign Up
                </span>
              </>
            </Alert>
          )}
          {!isSignIn && (
            <Alert variant="primary">
              <>
                <span>Already have an account ?</span>{" "}
                <span
                  className={Style.sign}
                  onClick={() => {
                    setIsSignIn(true);
                  }}
                >
                  Sign In
                </span>
              </>
            </Alert>
          )}
        </Form>
      </div>
    </>
  );
}

export default Authentication;
