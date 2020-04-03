import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "@Shared/helper-funcs";
import { PROFILE_PHOTO } from "@Shared/constants";

const initialState = {
  calledFetch: false,
  fetching: false,
  fetched: false,
  updating: false,
  updated: false,
  uploading: false,
  uploaded: false,
  fetchError: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  updatError: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  uploadError: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_START:
      return updateObject(state, { fetching: true });
    case actionTypes.FETCH_ACCOUNT_SUCCESS:
      return updateObject(state, {
        error: initialState.error,
        data: action.data,
        fetching: false,
        fetched: true
      });
    case actionTypes.FETCH_ACCOUNT_FAILED:
      console.log(
        "[Dispatch Error]: FETCH_ACCOUNT_FAILED ",
        action.error.errorDev
      );
      return updateObject(state, {
        data: initialState.data,
        fetchError: { ...state.fetchError, ...action.error },
        fetching: false
      });

    case actionTypes.UPDATE_ACCOUNT_START:
      return updateObject(state, { updating: true });
    case actionTypes.UPDATE_ACCOUNT_SUCCESS:
      return updateObject(state, {
        data: { ...state.data, ...action.data },
        updating: false,
        updated: true
      });
    case actionTypes.UPDATE_ACCOUNT_FAILED:
      console.log(
        "[Dispatch Error]: UPDATE_ACCOUNT_FAILED ",
        action.error.errorDev
      );
      return updateObject(state, {
        updatError: { ...state.updatError, ...action.error },
        updating: false
      });

    case actionTypes.UPLOAD_PROFILE_PHOTO_START:
      return updateObject(state, { uploading: true, uploaded: false });
    case actionTypes.UPLOAD_PROFILE_PHOTO_SUCCESS:
      return updateObject(state, {
        data: { ...state.data, [PROFILE_PHOTO]: { ...action.data } },
        uploading: false,
        uploaded: true
      });
    case actionTypes.UPLOAD_PROFILE_PHOTO_FAILED:
      console.log(
        "[Dispatch Error]: UPLOAD_PROFILE_PHOTO_FAILED ",
        action.error.errorDev
      );
      return updateObject(state, {
        uploadError: { ...state.uploadError, ...action.error },
        uploading: false
      });
    default:
      return state;
  }
};

export default reducer;
