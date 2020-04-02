import * as actionTypes from "./actionTypes";

export const fetchAccountStart = () => {
  return {
    type: actionTypes.FETCH_ACCOUNT_START
  };
};
export const fetchAccountFailed = error => {
  return {
    type: actionTypes.FETCH_ACCOUNT_FAILED,
    error: error
  };
};
export const fetchAccountSuccess = data => {
  return {
    type: actionTypes.FETCH_ACCOUNT_SUCCESS,
    data: data
  };
};

export const updateAccountStart = () => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_START
  };
};
export const updateAccountFailed = error => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_FAILED,
    error: error
  };
};
export const updateAccountSuccess = data => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
    data: data
  };
};

export const uploadProfilePhotoStart = () => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PHOTO_START
  };
};
export const uploadProfilePhotoFailed = error => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PHOTO_FAILED,
    error: error
  };
};
export const uploadProfilePhotoSuccess = data => {
  return {
    type: actionTypes.UPLOAD_PROFILE_PHOTO_SUCCESS,
    data: data
  };
};
