import React from "react";
import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Label,
} from "reactstrap";
import PostImg from "../../assets/images/img1.jpg";

import { GET_ALL_POSTS } from "./GET_ALL_POSTS";

const Posts = (props) => {
  const { errors, data } = useQuery(GET_ALL_POSTS);

  const Comment = ({ key, userComment, reply = false }) => {
    console.log('userComment?.reply ', userComment)
    return (
      <div key={key} className={`comment-container${reply ? ' ps-4 my-3' : ''}`}>
        <div className="comment-top">
          <div className="post-avatar d-flex">
            <p>
              {`${userComment?.author?.name}`}
            </p>
          </div>
        </div>
        <div className="comment-content">
          {userComment?.content}
        </div>
        {userComment?.reply && userComment?.reply.length > 0 && userComment?.reply?.map((reply, idx) => (
          <Comment key={`reply-${idx}`} userComment={reply} reply={true} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {data && data?.posts && data?.posts?.length > 0 ? data?.posts?.map((post, index) => {
              return (
                <>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5" className="d-flex">{post?.author?.name}</CardTitle>
                      <CardText>
                        {post?.text}
                      </CardText>
                      {post?.comments.length > 0 && (
                        <div className="post-action d-flex">
                          <div className="d-flex me-3">
                            <span className="material-icons me-1">comment</span>
                            {post?.comments.length}
                          </div>
                        </div>
                      )}
                    </CardBody>
                    {post?.comments.length > 0 && <hr className="m-1" />}
                    {post?.comments.length > 0 && (
                      <div className="comment-area p-3">
                        {post?.comments && post?.comments.length > 0 && post?.comments.map((comment, keyIdx) => <Comment key={`comment-${keyIdx}`} userComment={comment} reply={false} />)}
                      </div>
                    )}
                  </Card>
                  <br />
                </>
              );
            }) : (null)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
