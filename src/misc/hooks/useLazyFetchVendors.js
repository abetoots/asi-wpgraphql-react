import * as actions from "../store/actions/index";

//Boilerplate GraphQl request that is not concerned with giving out UI hints
//Dispatches store actions therefore UI should be handled using values from the store reducer
export const useLazyFetchVendors = (dispatch, token = "") => {
  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const startQuery = async theQuery => {
    console.log("[useLazyFetchVendors]: fetching...");
    dispatch(actions.fetchAccountStart());
    try {
      const resData = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: theQuery
        })
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      });

      if (resData.errors) {
        throw resData.errors;
      }

      console.log("[useLazyFetchVendors]: Done!", resData);
      dispatch(actions.fetchAccountSuccess(resData.data));
    } catch (err) {
      console.log("[useLazyFetchVendors]: Error!", err);
      dispatch(
        actions.fetchAccountFailed({
          errorDev: err,
          output:
            "Could not load results! Something went wrong with our servers"
        })
      );
    }
  };

  return [startQuery];
};
