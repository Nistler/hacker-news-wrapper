import { createAction } from "redux-actions";

export const addLatestStories = createAction("STORIES_LATEST_ADD");

export const addStory = createAction("STORY_ADD");

export const changeLoadingStatus = createAction("LOADING_STATUS_CHANGE");

export const setBranchStatus = createAction("BRANCH_STATUS_SET");

export const changeBranchStatus = createAction("BRANCH_STATUS_CHANGE");
