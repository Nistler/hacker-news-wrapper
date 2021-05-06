import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import * as actions from "../actions/actions";
import HackNews from "./HackNews";
import Story from "./Story.jsx";
//import { stories } from "../__fixtures__/stories"; // development
//import { storiesIDs } from "../__fixtures__/storiesIDs"; // development
import { getNewStories } from "../services/hacker-news-api"; // production
import Header from "./Header";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  return { stories: state.stories };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
  addStory: actions.addStory,
  setBranchStatus: actions.setBranchStatus,
};

const App = ({ addLatestStories, addStory, setBranchStatus }) => {
  const [requestStatus, setRequestStatus] = useState("fetching");

  useEffect(() => {
    setRequestStatus("fetching");
    const getStories = async () => {
      const latestStoriesIDs = await getNewStories(); // production
      addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) }); // production
      const data = JSON.parse(sessionStorage.getItem("branchesStatus"));
      const commentBranch = data ?? {};
      setBranchStatus({ commentBranch });
      //addLatestStories({ latestStoriesIDs: storiesIDs }); // development
      //addStory({ stories }); // development
    };
    getStories().then(() => setRequestStatus("finished"));
  }, [addLatestStories, addStory, setBranchStatus]);

  const main = (
    <Switch>
      <Route path="/" exact component={HackNews} />
      <Route path="/:id" component={Story} />
    </Switch>
  );

  return (
    <Router basename="/">
      <Header />
      {requestStatus === "fetching" ? (
        <main>
          <h2>LOADING</h2>
        </main>
      ) : (
        main
      )}
      <Footer />
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
