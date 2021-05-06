import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import { getNewStories } from "../services/hacker-news-api";
import StoryPreview from "./StoryPreview.jsx";
import LazyLoad from "react-lazyload";
import Placeholder from "./Placeholder";

const mapStateToProps = (state) => {
  return { stories: state.stories, ui: state.ui };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
};

const HackNews = ({ stories, addLatestStories }) => {
  const [seconds, setSeconds] = useState(59);

  // >> TIMER
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateStoriesIDs().then(() => setSeconds(59));
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSeconds, seconds]);

  // << TIMER

  const handleUpdateStoriesIDs = async () => {
    const latestStoriesIDs = await getNewStories();
    addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
    setSeconds(59);
  };

  const renderStories = () =>
    stories.latestStoriesIDs.map((storyID) => (
      <LazyLoad key={storyID} placeholder={<Placeholder />} offset={300}>
        <StoryPreview key={storyID} id={storyID} />
      </LazyLoad>
    ));

  return (
    <main>
      <h2>LATEST STORIES</h2>
      <div className="refresh-btn-wrapper">
        <button
          className="button button-animated"
          onClick={handleUpdateStoriesIDs}
        >
          <span>
            <span>Refresh {seconds}</span>
          </span>
        </button>
      </div>
      <section className="stories-list">{renderStories()}</section>
    </main>
  );
};

export default connect(mapStateToProps, actionCreators)(HackNews);
