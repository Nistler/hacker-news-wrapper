import axios from "axios";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";

export const getNewStories = async () =>
  await axios
    .get(`${baseUrl}newstories.json?print=pretty`)
    .then(({ data }) => data);

export const getItem = (storyId) =>
  axios
    .get(`${baseUrl}item/${storyId}.json?print=pretty`)
    .then(({ data }) => data)
    .catch(function (thrown) {
      console.log(thrown);
    });
