import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostAction } from "../../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import moment from "moment";

function PostDetails() {
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const memoryProfile = JSON.parse(localStorage.getItem("memoryProfile"));
  const [waiting, setWaiting] = useState(true);
  let navigate = useNavigate();
  const { id } = useParams();

  const fetchMyAPI = async () => {
    try {
      setWaiting(true);
      await dispatch(getPostAction(id, memoryProfile));
      setWaiting(false);
    } catch (error) {
      localStorage.clear();
      navigate("/auth", { replace: true });
    }
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

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
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetails;
