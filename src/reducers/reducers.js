import { handleActions } from "redux-actions";
import { combineReducers } from "@reduxjs/toolkit";
import * as actions from "../actions/actions";

const stories = handleActions(
  {
    [actions.addLatestStories](state, { payload: { latestStoriesIDs } }) {
      return { latestStoriesIDs, stories: state.stories };
    },
    [actions.addStory]({ latestStoriesIDs }, { payload: { stories } }) {
      return { latestStoriesIDs, stories };
    },
  },
  { latestStoriesIDs: [], stories: [] }
);

const ui = handleActions(
  {
    [actions.changeLoadingStatus](
      { commentBranch },
      { payload: { loadingStatus } }
    ) {
      return { commentBranch, loadingStatus };
    },
    [actions.changeBranchStatus](
      { commentBranch, loadingStatus },
      { payload: { id, status } }
    ) {
      return {
        loadingStatus,
        commentBranch: { ...commentBranch, [id]: status },
      };
    },
    [actions.setBranchStatus](
      { loadingStatus },
      { payload: { commentBranch } }
    ) {
      return {
        loadingStatus,
        commentBranch,
      };
    },
  },
  { loadingStatus: "loading", commentBranch: {} }
);

export default combineReducers({ stories, ui });
