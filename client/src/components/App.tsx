import * as React from "react";
import Particles from "react-particles-js";
import AppRouter from "../router/AppRouter";

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

  return (
    <div>
      <Particles params={particlesParams} className="bg-particles" />
      <AppRouter />
    </div>
  );
};

export default App;
