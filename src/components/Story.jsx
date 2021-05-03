import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import Comment from "../components/Comment.jsx";
import { Link } from "react-router-dom";
import Placeholder from "./Placeholder";
import LazyLoad from "react-lazyload";

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
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateComments();
    }
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
        <nav>
          <Link to={`/`}>
            <button>Back to news</button>
          </Link>
          <button onClick={handleUpdateComments}>Update comments</button>
          <div>{seconds}</div>
        </nav>
        {requestStatus === "fetching" ? (
          <h1>Loading</h1>
        ) : (
          <article>
            <p>
              <a href={story.url}>Source</a>
            </p>
            <h1>{story.title}</h1>
            <time>Date: {story.time}</time>
            <div>Author: {story.by}</div>
            <div>Comments: {story.descendants}</div>
            <hr />
            <section>
              <h2>Comments</h2>
              {renderComments()}
            </section>
          </article>
        )}
      </main>
    )
  );
};

export default Story;
