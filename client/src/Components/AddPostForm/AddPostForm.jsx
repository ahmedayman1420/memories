import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostAction,
  editPostACtion,
  errorResetAction,
  resetIdACtion,
  unexpectedErrorAction,
} from "../../Redux/Actions/actions";
import Alert from "react-bootstrap/Alert";
import {
  ERROR_ADD_POST,
  ERROR_EDIT_POST,
} from "../../Redux/Actions/actionStrings";

function AddPostForm() {
  const dispatch = useDispatch();
  const googleAuth = useSelector((state) => state.googleAuth);
  const error = useSelector((state) => state.error);
  const postId = useSelector((state) => state.postId);
  const [post, setPost] = useState({
    postName: "",
    title: "",
    message: "",
    tags: [],
    file: "",
  });
  const posts = useSelector((state) => state.posts);
  const [waiting, setWaiting] = useState(false);
  const [editState, setEditState] = useState(false);

  if (postId && editState === false) {
    setPost(posts.find((item) => item._id === postId));
    setEditState(true);
  }

  const savePostData = ({ target }) => {
    if (target.name !== "tags")
      setPost({ ...post, [target.name]: target.value });
    else setPost({ ...post, [target.name]: target.value.split(" ") });
  };

  const clearForm = (e) => {
    e.preventDefault();
    setPost({
      postName: "",
      title: "",
      message: "",
      tags: [],
      file: "",
    });

    document.getElementById("postForm").reset();
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setWaiting(true);
    if (!editState) {
      let result = Object.values(post).every((p) => {
        if (typeof p === "string") return p !== "" && !/^\s/.test(p);
        else return p[0] !== "";
      });
      if (result) {
        await dispatch(errorResetAction());
        await dispatch(addPostAction(post, googleAuth));
        clearForm(e);
      } else await dispatch(unexpectedErrorAction(ERROR_ADD_POST));
    } else {
      let result = Object.values(post).every((p) => {
        if (typeof p === "string") return p !== "" && !/^\s/.test(p);
        else return p[0] !== "";
      });
      if (result) {
        await dispatch(errorResetAction());
        await dispatch(editPostACtion(post, googleAuth));
        dispatch(resetIdACtion());
        setEditState(false);
        clearForm(e);
      } else await dispatch(unexpectedErrorAction(ERROR_EDIT_POST));
    }
    setWaiting(false);
  };

  const getBase64 = ({ target }, cb) => {
    let reader = new FileReader();
    if (target.files[0] && target.files[0].type.match("image.*"))
      reader.readAsDataURL(target.files[0]);
    else target.value = "";
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <>
      <div className="postForm text-center">
        <h2 className="text-center">
          {editState && "Editing a Memory"}
          {!editState && "Creating a Memory"}
        </h2>
        <Form onSubmit={submitPost} id="postForm">
          <Form.Group className="mb-3" controlId="formBasicCreator">
            <Form.Control
              onChange={savePostData}
              name="postName"
              type="text"
              placeholder="Creator"
              required={true}
              value={post.postName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="title"
              placeholder="Title"
              required={true}
              value={post.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="message"
              placeholder="Message"
              required={true}
              value={post.message}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTags">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="tags"
              placeholder="Tags"
              required={true}
              value={post.tags.join(" ")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFile">
            {!editState && (
              <Form.Control
                onChange={(e) => {
                  getBase64(e, (result) => {
                    setPost({
                      ...post,
                      [e.target.name]: result,
                      filePath: e.target.value,
                    });
                  });
                }}
                type="file"
                name="file"
                required={true}
              />
            )}
          </Form.Group>

          {error.value && error.type === "post" && (
            <Alert variant="danger">
              <Alert.Heading>{error.message}</Alert.Heading>
            </Alert>
          )}

          <Button
            onClick={(e) => {
              clearForm(e);
            }}
            className="mx-4"
            variant="danger"
            type="reset"
          >
            Clear
          </Button>
          {!editState && (
            <Button variant="primary" type="submit">
              {!waiting && "Submit"}
              {waiting && "wait ... "}
            </Button>
          )}
          {editState && (
            <Button variant="warning" type="submit">
              {!waiting && "Edit"}
              {waiting && "wait ... "}
            </Button>
          )}
        </Form>
      </div>
    </>
  );
}

export default AddPostForm;
