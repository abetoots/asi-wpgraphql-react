import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/helper-funcs";

const initialState = {
  fetching: false,
  fetched: false,
  error: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VENDORS_START:
      return updateObject(state, { fetching: true, fetched: false });
    case actionTypes.FETCH_VENDORS_FAILED:
      console.log(
        "[Dispatch Error]: FETCH_VENDORS_FAILED ",
        action.error.errorDev
      );
      return updateObject(state, {
        error: { ...state.error, ...action.error },
        fetching: false
      });
    case actionTypes.FETCH_VENDORS_SUCCESS:
      return updateObject(state, {
        data: action.data,
        fetching: false,
        fetched: true
      });
    default:
      return state;
  }
};

export default reducer;
