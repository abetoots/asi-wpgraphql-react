import * as actionTypes from "../actions/actionTypes";
import { tokenCache } from "../../hooks/authentication";
import { updateObject } from "../../shared/helper-funcs";
import { cleanupLocalStorage } from "../../hooks/authentication";

const initialState = {
  called: false,
  pending: false,
  authenticated: false,
  error: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  /**
   * TODO maybe not expose this as this is visible on Redux Devtools thus defeating the purpose of securing the token
   *
   * When using WPGraphQl, we should NOT rely on other values on authSuccess.
   * There are two actions that can trigger authSuccess in our app: login and refresh mutations.
   * We may have other data returned on a login mutation success but that data is not available
   * on a refresh mutation success (as of time of writing, though this likely won't change as this is
   * the intended behavior for authentication)
   *
   * To persist data from a login mutation, use setupLocalStorage() from ../hooks/authentication.js
   */
  token: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { pending: true, called: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        error: initialState.error,
        pending: false,
        authenticated: true,
        token: action.token
      });
    case actionTypes.AUTH_FAILED:
      console.log("[Dispatch Error]: AUTH_FAILED ", action.error.errorDev);
      return updateObject(state, {
        ...initialState,
        called: true,
        pending: false,
        error: { ...state.error, ...action.error }
      });
    case actionTypes.LOG_OUT:
      tokenCache.token = null;
      cleanupLocalStorage();
      return initialState;
    default:
      return state;
  }
};

export default reducer;
