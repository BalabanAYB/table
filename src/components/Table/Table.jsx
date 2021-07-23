import React from "react";
import style from "./TableContainer.module.css";

const Table = (props) => {
  return (
    <table border="1">
      <tbody>
        <tr>
          <th
            className={style.none}
            onClick={() => {
              props.dispatchTable({ type: "SORT_BY_TIME" });
              props.setSort("time");
            }}
          >
            Время добавления
          </th>
          <th
            onClick={() => {
              props.dispatchTable({ type: "SORT_BY_TITLE" });
              props.setSort("title");
            }}
          >
            Заголовок
          </th>
          <th
            className={style.none}
            onClick={() => {
              props.dispatchTable({ type: "SORT_BY_DOMAIN" });
              props.setSort("domain");
            }}
          >
            Домен
          </th>
        </tr>
        {props.news}
      </tbody>
    </table>
  );
};

export default Table;
