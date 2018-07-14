import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import fetchDataReducer from '../reducers/fetchDataReducer';
/*
import rootReducer from '../reducers'
import sagaMonitor from '../../../sagaMonitor'
*/

/* SSR - Get state rendered on server */
const initState = {};// { ...window.APP_STATE };

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();   /* const sagaMiddleware = createSagaMiddleware({ sagaMonitor }); */
  const store = createStore( fetchDataReducer, initialState, applyMiddleware(sagaMiddleware) );
  const close = () => store.dispatch(END);
  const runSaga = sagaMiddleware.run;
  return {
    ...store, close, runSaga
  }
};
