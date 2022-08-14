/* eslint-disable array-callback-return */
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./Post.module.scss";
import moment from "moment";
import { editPost } from "../../../Redux/Actions/actions";

function Post() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  return (
    <>
      <div className="row mt-5">
        {posts.map((post, index) => {
          return (
            <div className="col-md-12" key={post._id}>
              <div className="m-auto col-md-6 flex-wrap mb-4">
                <Card style={{ width: "" }} className={Style.cardParent}>
                  <Card.Img variant="top" src={post.file} />
                  <Card.Body>
                    <Card.Text>{post.tags.join(" ")}</Card.Text>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.message}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="d-flex justify-content-between ">
                      <Card.Text>
                        <span>Like </span>
                        <FontAwesomeIcon
                          className={["text-primary", Style.icon].join(" ")}
                          size="lg"
                          icon={faThumbsUp}
                        />
                        <span> 0</span>
                      </Card.Text>
                      <Card.Text>
                        <span>Delete </span>
                        <FontAwesomeIcon
                          className={["text-danger", Style.icon].join(" ")}
                          size="lg"
                          icon={faTrashAlt}
                        />
                      </Card.Text>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body
                    className={["text-white px-3", Style.cardChild].join(" ")}
                  >
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <Card.Title>{post.creator}</Card.Title>
                      <FontAwesomeIcon
                        className={[Style.icon].join(" ")}
                        size="lg"
                        icon={faEllipsis}
                        onClick={() => {
                          dispatch(editPost(post._id));
                        }}
                      />
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
