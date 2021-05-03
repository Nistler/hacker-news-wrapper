import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";

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

  const style = {
    borderLeft: "3px solid rgb(206, 206, 206)",
    paddingLeft: "10px",
    marginLeft: "40px",
  };

  return (
    comment && (
      <article style={style}>
        <h3>Author: {comment.by}</h3>
        {comment.deleted ? (
          <h4>[commentary deleted]</h4>
        ) : (
          <>
            <time>Date: {comment.time}</time>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </>
        )}
        {JSON.stringify(comment.kids)}
        <p>ID: {comment.id}</p>
        {comment.kids ? (
          <button
            onClick={handleChangeBranchStatus}
            disabled={requestStatus === "fetching"}
          >
            {!ui.commentBranch[comment.id] ||
            ui.commentBranch[comment.id] === "closed"
              ? "+"
              : "-"}
          </button>
        ) : (
          <button disabled>+</button>
        )}
        {handleKids()}
      </article>
    )
  );
};

export default connect(mapStateToProps, actionCreators)(Comment);
