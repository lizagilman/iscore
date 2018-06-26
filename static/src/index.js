import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { teal500, grey300 } from "material-ui/styles/colors";
import AppRouter from "./js/components/router/router_index";
import { Provider } from "mobx-react";
import * as Stores from "./js/stores";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.headerSwitcher = this.headerSwitcher.bind(this);

    this.state = {
      palette: {
        primary1Color: teal500,
        canvasColor: grey300
      }
    };
  }

  headerSwitcher(color) {
    console.log(color);

    this.setState({
      palette: {
        primary1Color: color,
        canvasColor: grey300
      }
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider
          muiTheme={getMuiTheme({ ...lightBaseTheme, ...this.state })}
        >
          <Provider stores={Stores}>{AppRouter(this.headerSwitcher)}</Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-app"));
