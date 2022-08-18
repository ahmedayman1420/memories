import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import Style from "./Authentication.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faG } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import {
  errorResetAction,
  googleAuthAction,
  signInAction,
  signUpAction,
  unexpectedErrorAction,
} from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_SIGNIN, ERROR_SIGNUP } from "../../Redux/Actions/actionStrings";

function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "633147263244-m08i8j19dacnbs07mjjqlflti4lhak2c.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const error = useSelector((state) => state.error);
  let [isSignIn, setIsSignIn] = useState(true);
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

    if (isSignIn) {
      // ====== ---- ====== Signin ====== ---- ====== //
      let result =
        user.email !== "" &&
        !/^\s/.test(user.emai) &&
        user.password !== "" &&
        !/^\s/.test(user.password);
      if (result) {
        const res = await dispatch(
          signInAction({
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: `${user.first_name} ${user.last_name}`,
          })
        );
        if (res?.data?.message === "Sign in Successfully") {
          setSuccess(true);
          await dispatch(errorResetAction());
          navigate("/", { replace: true });
        } else {
          await dispatch(unexpectedErrorAction(ERROR_SIGNIN));
        }
      } else {
        await dispatch(unexpectedErrorAction(ERROR_SIGNIN));
      }
      setWaiting(false);
    } else {
      // ====== ---- ====== Signin ====== ---- ====== //
      let result = Object.values(user).every((p) => {
        return p !== "" && !/^\s/.test(p);
      });

      if (result) {
        const res = await dispatch(
          signUpAction({
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            name: `${user.first_name} ${user.last_name}`,
          })
        );
        if (res?.data?.message === "Sign up Successfully") {
          setSuccess(true);
          await dispatch(errorResetAction());
          setWaiting(false);
          navigate("/", { replace: true });
        } else {
          setWaiting(false);
          await dispatch(unexpectedErrorAction(ERROR_SIGNUP));
        }
      } else {
        await dispatch(unexpectedErrorAction(ERROR_SIGNUP));
      }
      setWaiting(false);
    }
  };

  const responseGoogleSuccess = async (res) => {
    console.log("Google Sign Up success");
    const profile = res?.profileObj;
    const token = res?.tokenId;
    await dispatch(googleAuthAction(profile, token));
    await navigate("/", { replace: true });
  };

  const responseGoogleFailure = async (error) => {
    console.log("Google Sign up failure");
    console.log(error);
  };

  return (
    <>
      <div className="pt-5">
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <Form className="w-50" onSubmit={sendData}>
            {!isSignIn && (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Control
                  name="first_name"
                  type="text"
                  required={true}
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
                  required={true}
                  placeholder="Last name"
                  onChange={getUser}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                required={true}
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
                required={true}
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
                  required={true}
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
            {error.value && (
              <Alert variant="danger">
                <Alert.Heading>{error.message}</Alert.Heading>
              </Alert>
            )}
            <Button className="w-100 mb-3" variant="info" type="submit">
              {waiting && "Waiting ... "}
              {!waiting && !isSignIn && "Signup"}
              {!waiting && isSignIn && "Signin"}
            </Button>

            <GoogleLogin
              clientId="633147263244-m08i8j19dacnbs07mjjqlflti4lhak2c.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className="w-100 mb-3"
                  variant="success"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FontAwesomeIcon size="lg" icon={faG} />
                  <span> Google</span>
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />

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
      </div>
    </>
  );
}

export default Authentication;
