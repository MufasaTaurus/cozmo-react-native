/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';


// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import '!file-loader?name=[name].[ext]!./fonts.css';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
import 'file-loader?name=[name].[ext]!../web.config';
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './store';

// Import CSS reset and Global Styles
import './globalStyles.less';

// Import routes
import createRoutes from './routes';

// Import Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// plugin for handling Tap Events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

new FontFaceObserver('Avenir', {}).load().then(() => {
    document.body.classList.add('fontLoaded');
}, () => {
    document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time

  // module.hot.accept('./i18n', () => {
  //   render();
  // });
}

render();

if (process.env.NODE_ENV === 'production') {
    Raven.config('https://3bf0a5e3e8104cf7ba8ac7728245b535@sentry.io/164849').install();
}
