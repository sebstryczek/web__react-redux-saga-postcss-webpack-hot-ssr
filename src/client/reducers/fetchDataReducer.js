import * as actions from '../constants/actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {

    case actions.FETCH_DATA_REQUESTED:
      return state;

    case actions.FETCH_DATA_DONE:
      return {...state, data: action.payload};

    case actions.FETCH_DATA_FAILED:
      return {...state, error: action.payload};

    default:
      return state;
      
  }
}

export default reducer;
