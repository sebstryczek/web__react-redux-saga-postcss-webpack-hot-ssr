import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { runSaga } from 'redux-saga'
import fetchDataReducer from '../reducers/fetchDataReducer';
/*
import rootReducer from '../reducers'
import sagaMonitor from '../../../sagaMonitor'
*/

/* SSR - Get state rendered on server */
const initState = { ...window.APP_STATE };
/* *** */

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  //const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  return {
    ...createStore( fetchDataReducer, initState, applyMiddleware(sagaMiddleware) ),
    runSaga: sagaMiddleware.run
  }
};
