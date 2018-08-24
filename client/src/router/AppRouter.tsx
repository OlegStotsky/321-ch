import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import { Board, ThreadContainer } from "../components/Board";
import { allBoards } from "../../../shared/lib/static/BoardSections";
import { changangeCurrentBoard } from "../redux/actions/curBoard";
import { connect } from "react-redux";

const AppRouter = props => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        {allBoards.map(board => (
          <Route
            path={board.link}
            render={() => {
              props.dispatch(changangeCurrentBoard(board));
              return <Board boardCredentials={board} />;
            }}
            exact={true}
          />
        ))}
        {allBoards.map(board => (
          <Route
            path={`${board.link}/:threadNumber`}
            render={() => {
              props.dispatch(changangeCurrentBoard(board));
              return <ThreadContainer boardCredentials={board} {...props} />;
            }}
          />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

export default connect()(AppRouter);
