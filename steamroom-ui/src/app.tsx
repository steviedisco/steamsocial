import { h, Component } from "preact";

export interface AppProps {
  name: string;
}

interface AppState {
  name: string;
}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { name: props.name };
  }
  componentDidMount() {
    setTimeout(() => {
      var state = this.state;
      this.state = { name: "Preact's componentDidMount worked as expected" };
      this.setState(state);
    }, 2000);
  }
  render(props: AppProps, state: AppState) {
    return (<div>
      <h1>Props: {props.name}</h1>
      <h1>State: {state.name}</h1>
    </div>);
  }
}
