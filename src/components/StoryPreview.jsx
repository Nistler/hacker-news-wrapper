import React from "react";
import { Link } from "react-router-dom";

const StoryPreview = ({ story }) => {
  return (
    story && (
      <div>
        <Link to={`/${story.id}`}>{story.title}</Link>
        <div>Score: {story.score}</div>
        <div>Author: {story.by}</div>
        <div>Date: {story.time}</div>
        <div>Comments: {story.descendants}</div>
        <hr />
      </div>
    )
  );
};

export default StoryPreview;
