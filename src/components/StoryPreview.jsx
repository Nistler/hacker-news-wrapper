import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItem } from "../services/hacker-news-api";
import StoryPreviewPlaceholder from "./StoryPreviewPlaceholder";
import { timestampToTime } from "../utils/normalization";

const StoryPreview = ({ id }) => {
  const [story, setStory] = useState({});
  const [requestStatus, setRequestStatus] = useState("fetching");

  useEffect(() => {
    setRequestStatus("fetching");
    const storyRequest = async () => {
      const response = await getItem(id);
      setStory(response);
    };
    storyRequest().then(() => setRequestStatus("finished"));
  }, [id]);

  return !story || requestStatus === "fetching" ? (
    <StoryPreviewPlaceholder />
  ) : (
    <article className="story-preview">
      <Link className="link" to={`/${story.id}`}>
        {story.title}
      </Link>
      <section className="story-info">
        <div>
          <span>Score:</span> {story.score}
        </div>
        <div>
          <span>By:</span> {story.by}
        </div>
        <div>
          <span>Posted:</span> {timestampToTime(story.time)}
        </div>
        <div>
          <span>Comments:</span> {story.descendants}
        </div>
      </section>
    </article>
  );
};

export default StoryPreview;
