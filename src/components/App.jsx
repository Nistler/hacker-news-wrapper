import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import * as actions from "../actions/actions";
import HackNews from "./HackNews";
import Story from "./Story.jsx";
import { stories } from "../__fixtures__/stories";
import { storiesIDs } from "../__fixtures__/storiesIDs";
//import { getNewStories } from "../services/hacker-news-api";
import { loadProgressBar } from "axios-progress-bar";

loadProgressBar();

const mapStateToProps = (state) => {
  return { stories: state.stories };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
  addStory: actions.addStory,
};

const App = ({ addLatestStories, addStory }) => {
  useEffect(() => {
    const getStories = async () => {
      //const latestStoriesIDs = await getNewStories();
      //addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 30) });
      addLatestStories({ latestStoriesIDs: storiesIDs });
      addStory({ stories });
    };
    getStories().then();
  }, [addLatestStories, addStory]);

  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact component={HackNews} />
        <Route path="/:id" component={Story} />
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
