import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { timestampToTime } from "../utils/normalization";

const mapStateToProps = (state) => {
  return { ui: state.ui };
};

const actionCreators = { changeBranchStatus: actions.changeBranchStatus };

const Comment = ({ commentID, changeBranchStatus, ui }) => {
  const [kids, setKids] = useState([]);
  const [comment, setComment] = useState({});
  const [requestStatus, setRequestStatus] = useState("finished");

  useEffect(() => {
    const getRequest = async () => {
      setRequestStatus("fetching");
      const data = await getItem(commentID);
      setComment(data);
      if (
        !data ||
        !data.kids ||
        !ui.commentBranch[data.id] ||
        ui.commentBranch[data.id] === "closed"
      ) {
        return;
      }
      setKids(data.kids);
    };

    getRequest().then(() => setRequestStatus("finished"));
  }, [commentID, ui]);

  const createMarkup = () => {
    return { __html: comment.text };
  };

  const handleKids = () => {
    if (comment.kids === 0 || kids.length === 0 || !ui) {
      return;
    }
    if (
      ui.commentBranch[comment.id] &&
      ui.commentBranch[comment.id] === "opened"
    ) {
      return kids.map((kidID) => (
        <LazyLoad key={kidID}>
          <Comment
            key={kidID}
            commentID={kidID}
            changeBranchStatus={changeBranchStatus}
            ui={ui}
          />
        </LazyLoad>
      ));
    }
  };

  const handleChangeBranchStatus = () => {
    const status =
      !ui.commentBranch[comment.id] || ui.commentBranch[comment.id] === "closed"
        ? "opened"
        : "closed";
    sessionStorage.setItem(
      "branchesStatus",
      JSON.stringify({ ...ui.commentBranch, [comment.id]: status })
    );
    changeBranchStatus({ id: comment.id, status });
  };

  const btnState =
    !ui.commentBranch[comment.id] || ui.commentBranch[comment.id] === "closed";

  return (
    comment && (
      <article className="comment">
        <div className="comment-info">
          <span>By: </span>
          {comment.by}
          <span> Posted: </span>
          {timestampToTime(comment.time)}
        </div>
        {comment.deleted ? (
          <h4>[commentary deleted]</h4>
        ) : (
          <div
            className="comment-text"
            dangerouslySetInnerHTML={createMarkup()}
          />
        )}
        {comment.kids ? (
          <button
            className="button button-animated button-comment"
            onClick={handleChangeBranchStatus}
            disabled={requestStatus === "fetching"}
          >
            <span>
              <span>{btnState ? "Show replies" : "Hide replies"}</span>
            </span>
          </button>
        ) : (
          <button className="button btn-disabled" disabled>
            expand replies
          </button>
        )}
        {handleKids()}
      </article>
    )
  );
};

export default connect(mapStateToProps, actionCreators)(Comment);
