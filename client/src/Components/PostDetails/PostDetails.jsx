import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostAction, serachPostAction } from "../../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import moment from "moment";

function PostDetails() {
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  const [waiting, setWaiting] = useState(true);
  let navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector((state) => state.posts).filter((value) => {
    return value._id !== postDetails._id;
  });
  console.log(posts);
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
      setWaiting(true);
      await dispatch(
        serachPostAction(["hi"], postDetails.tags, memoryProfile, 1)
      );
      if (Object.keys(postDetails).length !== 0) setWaiting(false);
    };
    func();
  }, [postDetails]);

  useEffect(() => {
    fetchMyAPI();
  }, [id]);

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
                      <h5>Comments - comming soon !</h5>
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
