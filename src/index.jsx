/* eslint import/no-extraneous-dependencies: "off" */
import 'regenerator-runtime/runtime';
import 'babel-polyfill';
import 'semantic-ui-less/semantic.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

// Store
import configureStore from './redux/store';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

// Initial render
render(App);

// React-Hot-Loader API. If hot trigger HMR
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}