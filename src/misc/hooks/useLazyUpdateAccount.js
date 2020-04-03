import * as actions from "@Store/actions/index";

//Boilerplate GraphQl request that is not concerned with giving out UI hints
//Dispatches store actions therefore UI should be handled using values from the store reducer
export const useLazyUpdateAccount = (dispatch, token = "") => {
  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const startQuery = async theQuery => {
    console.log("[useLazyUpdateAccount]: fetching...");
    dispatch(actions.updateAccountStart());
    try {
      const resData = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

      console.log("[useLazyUpdateAccount]: Done!", resData);
      dispatch(actions.updateAccountSuccess(resData.data));
    } catch (err) {
      console.log("[useLazyUpdateAccount]: Error!", err);
      dispatch(
        actions.updateAccountFailed({
          errorDev: err,
          output: "Login failed! Something went wrong with our servers"
        })
      );
    }
  };

  return [startQuery];
};
