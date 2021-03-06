import { useState, useEffect } from "react";

//Boilerplate GraphQl fetch request that gives out UI hints from it's own state
export const useLazyGraphQlRequest = (token = "") => {
  const [loading, setLoading] = useState({
    isLoading: false,
    called: false
  });
  const [error, setError] = useState({ isError: false, output: "" });
  const [success, setSuccess] = useState({ isSuccess: false, data: [] });

  let headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const startQuery = async theQuery => {
    console.log("[useLazyGraphQlRequest]: fetching...");
    setLoading({ isLoading: true, called: true });
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

      console.log("[useLazyGraphQlRequest]: Done!", resData);
      setSuccess({ isSuccess: true, data: resData.data });
      return resData;
    } catch (err) {
      console.log("[useLazyFetchQuery]: Error!", err);
      setError({ isError: true, output: err });
    }
  };

  useEffect(() => {
    if (success.isSuccess || error.isError) {
      setLoading({ ...loading, isLoading: false });
    }
  }, [success, error]);

  return [startQuery, loading, success, error];
};
