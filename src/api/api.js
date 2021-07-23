import axios from "axios";

const news = "https://api.hnpwa.com/v0/news/";
const newest = "https://api.hnpwa.com/v0/newest/";

export const newsAPI = {
  getNews(currentPage, point) {
    return axios.get(`${point ? news : newest}${currentPage}.json`);
  },
};
