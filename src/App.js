import React, { useReducer } from "react";

import TableContext from "./state/tableContext";
import { TableReducer } from "./state/tableReducer";

import "./App.css";

import TableContainer from "./components/Table/TableContainer";

const App = () => {
  const initialState = {
    news: [],
    currentPage: 1,
    totalCount: 12,
  };

  const [tableState, dispatchTable] = useReducer(TableReducer, initialState);
  return (
    <div className="App">
      <TableContext.Provider value={{ tableState, dispatchTable }}>
        <TableContainer />
      </TableContext.Provider>
    </div>
  );
};

export default App;
