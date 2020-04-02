import * as actionTypes from "./actionTypes";

export const registerUserWillStart = () => {
  return {
    type: actionTypes.REGISTER_USER_WILL_START
  };
};
export const registerUserStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START
  };
};
export const registerUserFailed = error => {
  return {
    type: actionTypes.REGISTER_USER_FAILED,
    error: error
  };
};
export const registerUserSuccess = data => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    data: data
  };
};
