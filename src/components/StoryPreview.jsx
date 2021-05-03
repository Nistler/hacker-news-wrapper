import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItem } from "../services/hacker-news-api";
import Placeholder from "./Placeholder";

const StoryPreview = ({ id }) => {
  const [story, setStory] = useState({});
  const [requestStatus, setRequestStatus] = useState("finished");

  useEffect(() => {
    const storyRequest = async () => {
      setRequestStatus("fetching");
      const response = await getItem(id);
      setStory(response);
    };
    storyRequest().then(() => setRequestStatus("finished"));
  }, [id]);

  return story && requestStatus === "fetching" ? (
    <Placeholder />
  ) : (
    <article>
      <Link to={`/${story.id}`}>{story.title}</Link>
      <div>Score: {story.score}</div>
      <div>Author: {story.by}</div>
      <time>Date: {story.time}</time>
      <div>Comments: {story.descendants}</div>
      <hr />
    </article>
  );
};

export default StoryPreview;
