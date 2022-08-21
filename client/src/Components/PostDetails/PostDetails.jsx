import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCommentAction,
  errorResetAction,
  getPostAction,
  serachPostAction,
  unexpectedErrorAction,
} from "../../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ERROR_SEND_COMMENT } from "../../Redux/Actions/actionStrings";
import Alert from "react-bootstrap/Alert";
import { useRef } from "react";

function PostDetails() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const postDetails = useSelector((state) => state.postDetails);
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  const [waiting, setWaiting] = useState(true);
  const [waitingBtn, setWaitingBtn] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(postDetails.comments);
  let navigate = useNavigate();
  const commentRef = useRef();
  const { id } = useParams();
  const posts = useSelector((state) => state.posts).filter((value) => {
    return value._id !== postDetails._id;
  });

  const fetchMyAPI = async () => {
    try {
      setWaiting(true);
      await dispatch(getPostAction(id, memoryProfile));
    } catch (error) {
      localStorage.clear();
      navigate("/auth", { replace: true });
    }
  };

  useEffect(() => {
    const func = async () => {
      setComments(postDetails.comments);
      setWaiting(true);
      await dispatch(
        serachPostAction(postDetails.tags, postDetails.tags, memoryProfile, 1)
      );
      if (Object.keys(postDetails).length !== 0) setWaiting(false);
    };
    func();
  }, [postDetails._id]);

  useEffect(() => {
    fetchMyAPI();
  }, [id]);

  const handleComment = ({ target }) => {
    setComment(target.value);
  };

  const sendComment = async (e) => {
    e.preventDefault();
    if (comment !== "" && !/^\s/.test(comment)) {
      setComments([...comments, `${memoryProfile.user.name}: ${comment}`]);
      setWaitingBtn(true);
      await dispatch(errorResetAction());
      await dispatch(
        addCommentAction(
          `${memoryProfile.user.name}: ${comment}`,
          postDetails._id,
          memoryProfile
        )
      );
      commentRef.current.scrollIntoView({ behavior: "smooth" });
      setWaitingBtn(false);
      setComment("");
    } else await dispatch(unexpectedErrorAction(ERROR_SEND_COMMENT));
  };

  return (
    <>
      <div className="container mt-5">
        {waiting && <h1>Wait ...</h1>}
        {!waiting && (
          <div className="row">
            <div className="col-md-6">
              <Card style={{}}>
                <Card.Header>
                  <h2>{postDetails.title}</h2>
                </Card.Header>
                <div className="p-3">
                  <Card.Text>
                    {postDetails.tags
                      .map((value, index) => {
                        return "#" + value;
                      })
                      .join(" ")}
                  </Card.Text>
                  <p>{postDetails.message}</p>
                  <h5>Created by: {postDetails.postName}</h5>
                  <p>{moment(postDetails.createdAt).fromNow()}</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h5>Realtime Chat - comming soon !</h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="row justify-content-between">
                        <div className="col-md-6">
                          <Card>
                            <Card.Title>
                              <h5>Comments</h5>
                            </Card.Title>
                            <Card.Body>
                              <div
                                className="comments overflow-auto"
                                style={{ height: "100px" }}
                              >
                                {comments.map((c, i) => {
                                  return <Card.Text key={i}>{c}</Card.Text>;
                                })}
                                <div ref={commentRef}></div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                        <div className="col-md-6">
                          <h5>Write a comment</h5>
                          <Form onSubmit={sendComment}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Control
                                onChange={handleComment}
                                type="text"
                                placeholder="Comment"
                                value={comment}
                              />
                            </Form.Group>
                            {error.value && error.type === "comment" && (
                              <Alert variant="danger">
                                <Alert.Heading>{error.message}</Alert.Heading>
                              </Alert>
                            )}
                            <div className="text-center">
                              <Button
                                className="ml-auto"
                                variant="primary"
                                type="submit"
                              >
                                {waitingBtn && "Wait ..."}
                                {!waitingBtn && "Comment"}
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Card>
            </div>
            <div className="col-md-6 ">
              <img className="w-100 h-100" src={postDetails.file} alt="" />
            </div>

            <div className="recommendedPosts my-5">
              <div className="row">
                {posts.map((value) => {
                  return (
                    <div key={value._id} className="col-md-4 mb-4">
                      <Card style={{}}>
                        <Card.Img
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/post/details/${value._id}`, {
                              replace: true,
                            });
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          variant="top"
                          src={value.file}
                        />
                        <Card.Body>
                          <Card.Title>{value.title}</Card.Title>
                          <Card.Text>{value.message}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetails;
