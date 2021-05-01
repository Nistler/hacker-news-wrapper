import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import Comment from "../components/Comment.jsx";
import { Link } from "react-router-dom";
//import * as actions from "../actions/actions";
//import { connect } from "react-redux";

/*const mapStateToProps = (state) => {
  return { ui: state.ui };
};

const actionCreators = { changeLoadingStatus: actions.changeLoadingStatus };*/

const Story = ({
  match: {
    params: { id },
  },
  /*ui,
  changeLoadingStatus,*/
}) => {
  const [story, setStory] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    /*changeLoadingStatus({ loadingStatus: "loading" });*/
    const storyRequest = async () => {
      const response = await getItem(id);
      if (response.kids) {
        const promise = response.kids.map((id) => getItem(id));
        Promise.all(promise).then((data) => setComments(data));
        /*.then(() => changeLoadingStatus({ loadingStatus: "loaded" }));*/
      }
      setStory(response);
    };
    storyRequest().then();
  }, [id /*, changeLoadingStatus*/]);

  return (
    story && (
      <div>
        <Link to={`/`}>
          <button>Back to news</button>
        </Link>
        <p>
          <a href={story.url}>Source</a>
        </p>
        <h1>{story.title}</h1>
        <div>Date: {story.time}</div>
        <div>Author: {story.by}</div>
        <div>Comments: {story.descendants}</div>
        <hr />
        <h2>Comments</h2>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    )
  );
};

/*export default connect(mapStateToProps, actionCreators)(Story);*/
export default Story;
