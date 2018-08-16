import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(sagaMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f, // Browser Extension
  ));

  // React-Hot-Loader API
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSagas);

  return store;
};

export default configureStore;