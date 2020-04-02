import * as actions from "../store/actions/index";

//Boilerplate GraphQl request that is not concerned with giving out UI hints
//Dispatches store actions therefore UI should be handled using values from the store reducer
export const useLazyRegisterUser = (dispatch, token = "") => {
  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const startQuery = async theQuery => {
    console.log("[useLazyRegisterUser]: fetching...");
    dispatch(actions.registerUserStart());
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

      console.log("[useLazyRegisterUser]: Done!", resData);
      dispatch(actions.registerUserSuccess(resData.data));
    } catch (err) {
      console.log("[useLazyRegisterUser]: Error!", err);
      dispatch(
        actions.registerUserFailed({
          errorDev: err,
          output: "Registration failed! Something went wrong with our servers"
        })
      );
    }
  };

  return [startQuery];
};
