import React, { useEffect, useState, useContext } from "react";
import TableContext from "../../state/tableContext";
import "regenerator-runtime/runtime";

import { newsAPI } from "../../api/api";

import style from "./TableContainer.module.css";
import TableRow from "./TableRow/TableRow";
import Table from "./Table";
const TableContainer = () => {
  const { tableState, dispatchTable } = useContext(TableContext);

  const [news, setNews] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [sort, setSort] = useState("");
  const [newsToggle, setNewsToggle] = useState(false);

  const getNewsData = async (currentPage, newsToggle) => {
    const response = await newsAPI.getNews(currentPage, newsToggle);
    dispatchTable({
      type: "GET_NEWS",
      payload: response.data,
      clb: setFetching(false),
    });
    switch (sort) {
      case "time":
        dispatchTable({ type: "SORT_BY_TIME" });
      case "title":
        dispatchTable({ type: "SORT_BY_TITLE" });
      case "domain":
        dispatchTable({ type: "SORT_BY_DOMAIN" });

      default:
        break;
    }
  };

  useEffect(() => {
    if (tableState.news.length) {
      setNews(
        tableState.news.map((item, index) => (
          <TableRow
            link={item.link}
            key={index}
            title={item.title}
            timeAgo={item.timeAgo}
            domain={item.domain}
          />
        ))
      );
    } else {
      setFetching(true);
    }
  }, [tableState]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [tableState.totalCount]);

  useEffect(() => {
    if (fetching) {
      getNewsData(tableState.currentPage, newsToggle);
    }
  }, [fetching, newsToggle]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        150 &&
      tableState.currentPage < tableState.totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          dispatchTable({ type: "RESET" });
          getNewsData(tableState.currentPage, newsToggle ? false : true);
          setNewsToggle(newsToggle ? false : true);
        }}
        className={style.newsTable}
      >
        {newsToggle ? "Newest" : "News"}
      </div>
      <Table
        setSort={setSort}
        {...tableState}
        dispatchTable={dispatchTable}
        news={news}
      />
      <div
        onClick={() => {
          dispatchTable({ type: "SORT_BY_TIME" });
          setSort("time");
        }}
        className={style.sort}
      >
        Sort to Time
      </div>
    </>
  );
};


export default TableContainer;
