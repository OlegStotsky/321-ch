import * as React from "react";
import AppRouter from "../router/AppRouter";
import BackgroundParticles from "./BackgroundParticles";
import { Provider } from "react-redux";
import createStore from "../redux/store/createStore";

const App = () => {
  const store = createStore();
  return (
    <div>
      <BackgroundParticles />
      <div className="main-wrapper">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </div>
  );
};

export default App;
