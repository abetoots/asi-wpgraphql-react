//Boilerplate GraphQl request that is not concerned with giving out UI hints
//Dispatches store actions therefore UI should be handled using values from the store reducer
export const useLazyGraphQlRequestDispatch = (dispatch, token = "") => {
  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const startQuery = async theQuery => {
    console.log("[useLazyGraphQlRequestDispatch]: fetching...");
    dispatch(start()); //replace me
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

      console.log("[useLazyGraphQlRequestDispatch]: Done!", resData);
      dispatch(success()); //replace me
    } catch (err) {
      console.log("[useLazyFetchQuery]: Error!", err);
      dispatch(fail()); //replace me
    }
  };

  return [startQuery];
};
