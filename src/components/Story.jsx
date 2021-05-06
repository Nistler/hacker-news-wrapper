import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import Comment from "../components/Comment.jsx";
import Placeholder from "./Placeholder";
import LazyLoad from "react-lazyload";
import { timestampToTime } from "../utils/normalization";

const Story = ({
  match: {
    params: { id },
  },
}) => {
  const [story, setStory] = useState({});
  const [comments, setComments] = useState([]);
  const [requestStatus, setRequestStatus] = useState("finished");
  const [seconds, setSeconds] = useState(59);

  // >> TIMER

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateComments().then(() => setSeconds(59));
    }
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeconds, seconds]);

  // << TIMER

  useEffect(() => {
    const storyRequest = async () => {
      setRequestStatus("fetching");
      const response = await getItem(id);
      if (response.kids) {
        setComments(response.kids);
      }
      setStory(response);
    };
    storyRequest().then(() => setRequestStatus("finished"));
  }, [id, setComments]);

  const renderComments = () =>
    comments.map((commentID) => (
      <LazyLoad key={commentID} placeholder={<Placeholder />}>
        <Comment key={commentID} commentID={commentID} />
      </LazyLoad>
    ));

  const handleUpdateComments = async () => {
    const response = await getItem(id);
    if (response.kids) {
      setComments(response.kids);
    }
    setStory(response);
    setSeconds(59);
  };

  return (
    story && (
      <main>
        {requestStatus === "fetching" ? (
          <h2>Loading</h2>
        ) : (
          <article>
            <h2>
              {story.title} (
              <a className="nav-link link-source" href={story.url}>
                SOURCE
              </a>
              )
            </h2>
            <section className="story-info justify-center">
              <div>
                <span>Score:</span> {story.score}
              </div>
              <div>
                <span>By:</span> {story.by}
              </div>
              <div>
                <span>Posted:</span> {timestampToTime(story.time)}
              </div>
            </section>
            <div className="comments-header">
              <div className="comment-counter-wrapper">
                <span>Comments: {story.descendants}</span>
              </div>
              <button
                className="button button-animated"
                onClick={handleUpdateComments}
              >
                <span>
                  <span>Refresh {seconds}</span>
                </span>
              </button>
            </div>
            <section className="comments-list">
              {comments.length > 0 ? (
                renderComments()
              ) : (
                <h3 className="h3">No comments yet</h3>
              )}
            </section>
          </article>
        )}
      </main>
    )
  );
};

export default Story;
