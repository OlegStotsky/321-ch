import * as React from "react";
import Particles from "react-particles-js";
import AppRouter from "../router/AppRouter";
import { Provider } from "react-redux";
import createStore from "../redux/store/createStore";

const App = () => {
  const particlesParams = {
    particles: {
      number: {
        density: {
          value_area: 100
        },
        value: 150
      }
    }
  };

  const store = createStore();

  return (
    <div>
      <Particles params={particlesParams} className="bg-particles" />
      <div className="main-wrapper">
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </div>
  );
};

export default App;
