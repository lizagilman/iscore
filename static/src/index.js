import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { teal500, grey300 } from "material-ui/styles/colors";
import AppRouter from "./js/components/router/router_index";
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

//const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
 // form: formReducer
//})

//const store = createStore(rootReducer)

const themeOverrides = {
  palette: {
    primary1Color: teal500,
    canvasColor: grey300
  }
};


class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider
          muiTheme={getMuiTheme({ ...lightBaseTheme, ...themeOverrides })}>
          <AppRouter />
        </MuiThemeProvider>
      </div>
    );
  }
}

//render(
  //<Provider store={store}>
  //  <App />
  //</Provider>,
//  document.getElementById("react-app")
//)


ReactDOM.render(<App />, document.getElementById("react-app"));