import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  errorReset,
  resetId,
  unexpectedError,
} from "../../Redux/Actions/actions";
import Alert from "react-bootstrap/Alert";

function AddPostForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const postId = useSelector((state) => state.postId);
  console.log({ postId });
  const [post, setPost] = useState({
    _id: "",
    creator: "",
    title: "",
    message: "",
    tags: [],
    file: "",
    filePath: "",
  });
  console.log({ post });
  const posts = useSelector((state) => state.posts);
  const [waiting, setWaiting] = useState(false);
  const [editState, setEditState] = useState(false);

  if (postId) {
    setPost(posts.find((item) => item._id === postId));
    setEditState(true);
    dispatch(resetId());
  }

  const savePostData = ({ target }) => {
    if (target.name !== "tags")
      setPost({ ...post, [target.name]: target.value });
    else setPost({ ...post, [target.name]: target.value.split(" ") });
  };

  const clearForm = (e) => {
    e.preventDefault();
    setPost({
      creator: "",
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
    let result = Object.values(post).every((p) => p !== "");
    if (result) {
      await dispatch(errorReset());
      await dispatch(addPost(post));
      clearForm(e);
    } else {
      await dispatch(unexpectedError("ERROR_ADD_POST"));
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
          {editState && "Edit a Memory"}
          {!editState && "Creating a Memory"}
        </h2>
        <Form onSubmit={submitPost} id="postForm">
          <Form.Group className="mb-3" controlId="formBasicCreator">
            <Form.Control
              onChange={savePostData}
              name="creator"
              type="text"
              placeholder="Creator"
              required={true}
              value={post.creator}
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
                  console.log(e.target.value);
                  console.log(e.target.value.slice(12));
                }}
                type="file"
                name="file"
                required={true}
              />
            )}
          </Form.Group>

          {error.value && (
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
          <Button variant="primary" type="submit">
            {!waiting && !editState && "Submit"}
            {!waiting && editState && "Edit"}
            {waiting && "wait ... "}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddPostForm;
