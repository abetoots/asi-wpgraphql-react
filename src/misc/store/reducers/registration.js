import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "@Shared/helper-funcs";

const initialState = {
  pending: false,
  registered: false,
  error: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_WILL_START:
      return initialState;
    case actionTypes.REGISTER_USER_START:
      return updateObject(state, { pending: true });
    case actionTypes.REGISTER_USER_SUCCESS:
      return updateObject(state, {
        error: initialState.error,
        data: action.data,
        pending: false,
        registered: true
      });
    case actionTypes.REGISTER_USER_FAILED:
      console.log(
        "[Dispatch Error]: REGISTER_USER_FAILED ",
        action.error.errorDev
      );
      return updateObject(state, {
        data: initialState.data,
        error: { ...state.error, ...action.error },
        pending: false
      });
    default:
      return state;
  }
};

export default reducer;
