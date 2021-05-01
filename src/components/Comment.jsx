import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import * as actions from "../actions/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { ui: state.ui };
};

const actionCreators = { changeBranchStatus: actions.changeBranchStatus };

const Comment = ({ comment, changeBranchStatus, ui }) => {
  const [kids, setKids] = useState([]);
  const [requestStatus, setRequestStatus] = useState("finished");

  useEffect(() => {
    const getRequest = () => {
      if (!comment.kids) {
        return;
      }
      if (
        !ui.commentBranch[comment.id] ||
        ui.commentBranch[comment.id] === "closed"
      ) {
        return;
      }
      setRequestStatus("fetching");
      const promise = comment.kids.map((id) => getItem(id));
      Promise.all(promise)
        .then((data) => setKids(data))
        .then(() => setRequestStatus("finished"));
    };

    getRequest();
  }, [comment.id, comment.kids, ui]);

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
      return kids.map((kid) => (
        <Comment
          key={kid.id}
          comment={kid}
          changeBranchStatus={changeBranchStatus}
          ui={ui}
        />
      ));
    }
  };

  const handleChangeBranchStatus = () => {
    const status =
      !ui.commentBranch[comment.id] || ui.commentBranch[comment.id] === "closed"
        ? "opened"
        : "closed";
    changeBranchStatus({ id: comment.id, status });
  };

  const style = {
    borderLeft: "3px solid rgb(206, 206, 206)",
    paddingLeft: "10px",
    marginLeft: "40px",
  };

  return (
    comment && (
      <div style={style}>
        <h3>Author: {comment.by}</h3>
        {comment.deleted ? (
          <h4>[commentary deleted]</h4>
        ) : (
          <>
            <p>Date: {comment.time}</p>
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
      </div>
    )
  );
};

export default connect(mapStateToProps, actionCreators)(Comment);
