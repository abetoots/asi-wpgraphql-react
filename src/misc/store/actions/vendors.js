import * as actionTypes from "./actionTypes";

export const fetchVendorsStart = () => {
  return {
    type: actionTypes.FETCH_VENDORS_START
  };
};
export const fetchVendorsFailed = error => {
  return {
    type: actionTypes.FETCH_VENDORS_FAILED,
    error: error
  };
};
export const fetchVendorsSuccess = data => {
  return {
    type: actionTypes.FETCH_VENDORS_SUCCESS,
    data: data
  };
};

export const fetchVendorsByFilter = filters => {};

export const fetchVendorsByCategory = category => {};
