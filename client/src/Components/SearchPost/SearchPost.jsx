import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import {
  errorResetAction,
  serachPostAction,
  unexpectedErrorAction,
} from "../../Redux/Actions/actions";
import { ERROR_SEARCH_POST } from "../../Redux/Actions/actionStrings";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";
function SearchPost() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const googleAuth = useSelector((state) => state.googleAuth);
  const error = useSelector((state) => state.error);
  const [searchPost, setSearchPost] = useState({
    titles: [],
    tags: [],
  });
  const [waiting, setWaiting] = useState(false);

  const saveSearchPost = (name, chips) => {
    setSearchPost({ ...searchPost, [name]: chips });
  };

  const deleteChip = (name, index) => {
    let arr = searchPost[name];
    arr.splice(index, 1);
    console.log(arr);
    setSearchPost({ ...searchPost, [name]: arr });
  };

  const clearForm = (e) => {
    e.preventDefault();
    setSearchPost({
      titles: [],
      tags: [],
    });

    document.getElementById("searchPost").reset();
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    setWaiting(true);
    let result = Object.values(searchPost).every((p) => {
      return p.length;
    });

    if (result) {
      await dispatch(errorResetAction());
      await dispatch(
        serachPostAction(searchPost.titles, searchPost.tags, googleAuth)
      );
      navigate(
        `/posts/search?titles=${searchPost.titles}&tags=${searchPost.tags}`,
        {
          replace: true,
        }
      );
      clearForm(e);
    } else await dispatch(unexpectedErrorAction(ERROR_SEARCH_POST));

    setWaiting(false);
  };

  return (
    <>
      <div className="postForm text-center">
        <h2 className="text-center">Search memories</h2>
        <Form onSubmit={submitSearch} id="searchPost">
          {/* <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="title"
              placeholder="Title"
              required={true}
              value={searchPost.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTags">
            <Form.Control
              onChange={savePostData}
              type="text"
              name="tags"
              placeholder="Tags"
              required={true}
              value={searchPost.tags.join(" ")}
            />
          </Form.Group> */}

          <div className="btn w-100 mb-4">
            <ChipInput
              className="w-100"
              placeholder="Titles"
              onChange={(chips) => saveSearchPost("titles", chips)}
              value={searchPost.titles}
              onDelete={(value, index) => deleteChip("titles", index)}
            />
          </div>
          <div className="btn  w-100 mb-4">
            <ChipInput
              className="w-100"
              placeholder="Tags"
              onChange={(chips) => saveSearchPost("tags", chips)}
              value={searchPost.tags}
              onDelete={(value, index) => deleteChip("tags", index)}
            />
          </div>

          {error.value && error.type === "search" && (
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
            {!waiting && "Search"}
            {waiting && "wait ... "}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SearchPost;
