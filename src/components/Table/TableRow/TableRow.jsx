import React from "react";
import style from "./TableRow.module.css";

const TableRow = (props) => {
  return (
    <tr className={style.row}>
      <td className={style.cell}>{props.timeAgo}</td>
      <td className={`${style.cell} ${style.title}`}>
        <a href={props.link} target="_blank">
          {props.title}
        </a>
      </td>
      <td className={style.cell}>{props.domain}</td>
    </tr>
  );
};

export default TableRow;
