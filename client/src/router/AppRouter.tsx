import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import { Board, ThreadContainer } from "../components/Board";
import { allBoards } from "../../../shared/lib/static/BoardSections";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        {allBoards.map(board => (
          <Route
            path={board.link}
            render={() => <Board boardCredentials={board} />}
            exact={true}
          />
        ))}
        {allBoards.map(board => (
          <Route
            path={`${board.link}/:threadNumber`}
            render={(props: any) => (
              <ThreadContainer boardCredentials={board} {...props} />
            )}
          />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
