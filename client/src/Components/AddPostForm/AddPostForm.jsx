import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addPost } from "../../Redux/Actions/actions";

function AddPostForm() {
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    creator: "",
    title: "",
    message: "",
    tags: [],
    file: "",
  });

  const savePostData = ({ target }) => {
    if (target.name !== "tags")
      setPost({ ...post, [target.name]: target.value });
    else setPost({ ...post, [target.name]: target.value.split(" ") });
    console.log(post);
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

  const submitPost = (e) => {
    e.preventDefault();
    dispatch(addPost(post));
    clearForm(e);
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
      <div className="postForm ">
        <h2 className="text-center">Creating a Memory</h2>
        <Form onSubmit={submitPost} id="postForm">
          <Form.Group className="mb-3" controlId="formBasicCreator">
            <Form.Control
              onChange={savePostData}
              name="creator"
              type="text"
              placeholder="Creator"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="title"
              placeholder="Title"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="message"
              placeholder="Message"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTags">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="tags"
              placeholder="Tags"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Control
              onChange={(e) => {
                getBase64(e, (result) => {
                  setPost({ ...post, [e.target.name]: result });
                });
              }}
              type="file"
              name="file"
              required={true}
            />
          </Form.Group>

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
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddPostForm;
