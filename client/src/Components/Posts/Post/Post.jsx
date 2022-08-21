/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faThumbsUp as faThumbsUpSolid,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import Style from "./Post.module.scss";
import moment from "moment";
import {
  deletePostAction,
  likePostAction,
  setEditPostIdAction,
} from "../../../Redux/Actions/actions";
import { useNavigate } from "react-router-dom";

function Post() {
  const posts = useSelector((state) => state.posts);
  const googleAuth = useSelector((state) => state.googleAuth);
  const dispatch = useDispatch();
  const [waitingLike, setWaitingLike] = useState(false);
  const [waitingDelete, setWaitingDelete] = useState(false);
  const [deletedPostId, setdDletedPostId] = useState("");
  const [editedPostId, setdEditedPostId] = useState("");
  let navigate = useNavigate();

  return (
    <>
      <div className="row mt-5">
        {posts.map((post, index) => {
          return (
            <div className="col-md-12" key={post._id}>
              <div className="m-auto col-md-6 flex-wrap mb-4">
                <Card style={{ width: "" }} className={Style.cardParent}>
                  <Card.Img
                    style={{ cursor: "pointer" }}
                    variant="top"
                    src={post.file}
                    onClick={() => {
                      navigate(`/post/details/${post._id}`, { replace: true });
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  />
                  <Card.Body>
                    <Card.Text>
                      {post.tags
                        .map((value, index) => {
                          return "#" + value;
                        })
                        .join(" ")}
                    </Card.Text>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.message}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="d-flex justify-content-between ">
                      <Card.Text>
                        <span>
                          {(!waitingLike || editedPostId !== post._id) &&
                            "Like "}
                          {waitingLike &&
                            editedPostId === post._id &&
                            "Wait ... "}
                        </span>
                        <FontAwesomeIcon
                          className={["text-primary", Style.icon].join(" ")}
                          size="lg"
                          icon={
                            (post.likeCount.includes(googleAuth.user._id) &&
                              faThumbsUpSolid) ||
                            faThumbsUp
                          }
                          onClick={async () => {
                            setWaitingLike(true);
                            setdEditedPostId(post._id);
                            await dispatch(likePostAction(post, googleAuth));
                            setdEditedPostId("");
                            setWaitingLike(false);
                          }}
                        />
                        <span> {post.likeCount.length}</span>
                      </Card.Text>
                      {post.creator === googleAuth.user._id && (
                        <Card.Text>
                          <span>
                            {(!waitingDelete || deletedPostId !== post._id) &&
                              "Delete "}
                            {waitingDelete &&
                              deletedPostId === post._id &&
                              "Wait ... "}
                          </span>
                          <FontAwesomeIcon
                            className={["text-danger", Style.icon].join(" ")}
                            size="lg"
                            icon={faTrashAlt}
                            onClick={async () => {
                              setWaitingDelete(true);
                              setdDletedPostId(post._id);
                              await dispatch(
                                deletePostAction(post, googleAuth)
                              );
                              setdDletedPostId("");
                              setWaitingDelete(false);
                            }}
                          />
                        </Card.Text>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body
                    className={["text-white px-3", Style.cardChild].join(" ")}
                  >
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <Card.Title>{post.postName}</Card.Title>
                      {post.creator === googleAuth.user._id && (
                        <FontAwesomeIcon
                          className={[Style.icon].join(" ")}
                          size="lg"
                          icon={faEllipsis}
                          onClick={() => {
                            dispatch(setEditPostIdAction(post._id));
                          }}
                        />
                      )}
                    </Card.Title>
                    <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Post;
