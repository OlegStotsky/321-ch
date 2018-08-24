import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import { Board, ThreadContainer } from "../components/Board";
import { allBoards } from "../../../shared/lib/static/BoardSections";
import { changangeCurrentBoard } from "../redux/actions/curBoard";
import { connect } from "react-redux";
import { changeCurrentThread } from "../redux/actions/curThread";

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
            render={(routeProps) => {
              props.dispatch(changangeCurrentBoard(board));
              props.dispatch(changeCurrentThread(routeProps.match.params.threadNumber));
              return <ThreadContainer {...routeProps} />;
            }}
          />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

export default connect()(AppRouter);
