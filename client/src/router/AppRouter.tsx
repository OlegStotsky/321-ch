import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import { Board } from "../components/Board";
import { allBoards } from "../lib/static/BoardSections";

console.log(allBoards);
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        {allBoards.map(board => (
          <Route path={board.link} render={() => <Board boardCredentials={board} />} />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
