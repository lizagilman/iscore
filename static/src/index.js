import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal500, grey300 } from 'material-ui/styles/colors';
import AppRouter from './js/components/router/router_index';
import { Provider } from 'mobx-react';
import * as Stores from "./js/stores";

const themeOverrides = {
  palette: {
    primary1Color: teal500,
    canvasColor: grey300,
  },
};


class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider
          muiTheme={getMuiTheme({ ...lightBaseTheme, ...themeOverrides })}
        >
          <Provider stores={Stores}>
            <AppRouter />
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
