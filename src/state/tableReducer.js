export const TableReducer = (state, action) => {
  switch (action.type) {
    case "GET_NEWS": {
      action.clb && action.clb();
      return {
        ...state,
        news: [
          ...state.news,
          ...action.payload.map((news) => ({
            key: news.id,
            title: news.title,
            link: news.url,
            timeAgo: news.time_ago,
            domain: news.domain,
            time: news.time,
          })),
        ],
        currentPage: state.currentPage + 1,
      };
    }
    case "RESET": {
      return { ...state, news: [], currentPage: 1 };
    }
    case "SORT_BY_TIME": {
      return {
        ...state,
        news: [...state.news.sort((a, b) => (a.time < b.time ? 1 : -1))],
      };
    }
    case "SORT_BY_TITLE": {
      return {
        ...state,
        news: [...state.news.sort((a, b) => a.title.localeCompare(b.title))],
      };
    }
    case "SORT_BY_DOMAIN": {
      return {
        ...state,
        news: [
          ...state.news.sort((x, y) =>
            x.domain === undefined ? -5 : x.domain.localeCompare(y.domain)
          ),
        ],
      };
    }
    default:
      return state;
  }
};
