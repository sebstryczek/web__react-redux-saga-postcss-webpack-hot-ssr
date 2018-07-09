import * as actions from '../constants/actionTypes';
import firebase from '../../firebase/wrapper';

export function getDataRequested() {
  return {
    type: actions.FETCH_DATA_REQUESTED
  }
}

export function getDataDone(data) {
  return {
    type: actions.FETCH_DATA_DONE,
    payload: data
  }
}

export function getDataFailed(error) {
  return {
    type: actions.FETCH_DATA_FAILED,
    payload: error
  }
}
