import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import { Board, ThreadContainer } from "../components/Board";
import { allBoards } from "../../../shared/lib/static/BoardSections";
import {
  changangeCurrentBoard,
  getAllThreads
} from "../redux/actions/curBoard";
import { connect } from "react-redux";
import { changeCurrentThreadNumber } from "../redux/actions/curThread";
import FlashMessagesList from "../components/FlashMessagesList";

const AppRouter = props => (
  <BrowserRouter>
    <div>
      <FlashMessagesList />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        {allBoards.map(board => (
          <Route
            path={board.link}
            render={() => {
              props.dispatch(changangeCurrentBoard(board));
              props.getAllThreads();
              return <Board />;
            }}
            exact={true}
          />
        ))}
        {allBoards.map(board => (
          <Route
            path={`${board.link}/:threadNumber`}
            render={routeProps => {
              props.dispatch(changangeCurrentBoard(board));
              props.dispatch(
                changeCurrentThreadNumber(routeProps.match.params.threadNumber)
              );
              return <ThreadContainer {...routeProps} />;
            }}
          />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

const mapDispatchToProps = dispatch => ({
  dispatch,
  getAllThreads: () => dispatch(getAllThreads())
});

export default connect(
  null,
  mapDispatchToProps
)(AppRouter);
