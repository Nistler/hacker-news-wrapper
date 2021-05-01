import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import { getNewStories, getItem } from "../services/hacker-news-api";
import StoryPreview from "./StoryPreview.jsx";
//import Story from "./Story.jsx";
//import { stories as demoStories } from "../__fixtures__/stories";

const mapStateToProps = (state) => {
  return { stories: state.stories };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
  addStory: actions.addStory,
};

const HackNews = ({ stories, addLatestStories, addStory }) => {
  const handleUpdateStoriesIDs = async () => {
    const latestStoriesIDs = await getNewStories();
    addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 30) });
  };

  const handleRequest = () => {
    const promise = stories.latestStoriesIDs.map((id) => getItem(id));
    Promise.all(promise).then((stories) => addStory({ stories }));
  };

  const renderStories = () =>
    stories.stories.map((story) => (
      <StoryPreview key={story.id} id={story.id} story={story} />
    ));

  return (
    <div>
      <p>Hello</p>
      <button onClick={handleUpdateStoriesIDs}>Update Stories</button>
      <button onClick={handleRequest}>Request</button>
      <hr />
      {renderStories()}
      {/*<Story story={demoStories[15]} />*/}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(HackNews);
