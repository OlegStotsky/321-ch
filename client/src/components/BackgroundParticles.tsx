import * as React from "react";
import Particles from "react-particles-js";
import { throttle, debounce } from "throttle-debounce";

export default class BackgroundParticles extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      particlesParams: {
        particles: {
          number: {
            density: {
              value_area: 10
            },
            value: 100
          }
        },
        height: 1000
      },
      scrollTop: 0
    };
  }

  public componentDidMount() {
    document
      .querySelector("#app")
      .addEventListener("scroll", debounce(130, this.handleScroll));
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public handleScroll = () => {
    const scrollTop = document.querySelector("#app").scrollTop;
    this.setState({
      scrollTop
    });
  };

  public render() {
    return (
      <Particles
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: this.state.scrollTop,
          transition: "all .5s"
        }}
        params={this.state.particlesParams}
      />
    );
  }
}
