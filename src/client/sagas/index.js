import { call, put, takeEvery, fork } from 'redux-saga/effects'
import { FETCH_DATA_REQUESTED } from '../constants/actionTypes';
import { getDataDone, getDataFailed } from '../actions/fetchDataActions';
import firebase from '../../firebase/wrapper';

function* fetchData() {
  try {
    const data = yield call(firebase.get, 'pages');
    yield put( getDataDone(data) );
  } catch (error) {
    yield put( getDataFailed(error) );
  }
}

// Listen FETCH_DATA_REQUESTED action
// on every dispatch
// run and return result of fetchData generator
function* fetchDataSaga() {
  yield takeEvery( FETCH_DATA_REQUESTED, fetchData );
}

export default function* root() {
  yield fork(fetchDataSaga);
}
