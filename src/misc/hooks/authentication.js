import { useState, useEffect } from "react";

import {
  JWT_AUTH_EXPIRATION,
  AUTH_TOKEN,
  REFRESH_TOKEN,
  USER_ID
} from "@Shared/constants";
import { getRefreshMutation } from "@Shared/graphql-requests";
import * as actions from "@Store/actions/index";

//Follow this auth flow : https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_persist
//For WPGraphQl , simplified : https://github.com/NeverNull/gatsby-apollo-wpgraphql-jwt-starter/issues/1

//!Do not use as hints for UI updates
export const tokenCache = {};

export const useLazyLoginMutation = dispatch => {
  const startLogin = async theQuery => {
    console.log("[useLazyLoginMutation]: fetching...");
    dispatch(actions.authStart());
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

      console.log("[useLazyLoginMutation]: Done!", resData);
      setupLocalStorage(resData.data);
      tokenCache.token = resData.data.login[AUTH_TOKEN];
      silentlyRefresh();
      dispatch(actions.authSuccess(resData.data.login[AUTH_TOKEN]));
    } catch (err) {
      console.log("[useLazyLoginMutation]: Error!", err);
      dispatch(
        actions.authFailed({
          errorDev: err,
          output: "Login failed! Something went wrong with our servers"
        })
      );
    }
  };

  return [startLogin];
};

/**
 * TODO better comments
 * Handle refreshing of auth token
 * Success: We start a silent refresh in the background
 * Error: Handle error, fetch a new auth token
 *
 * @param {String} refreshToken
 */
export const useRefreshToken = () => {
  const [loading, setLoading] = useState({
    loadingRefresh: false,
    called: false
  });
  const [success, setSuccess] = useState({ successRefresh: false, token: "" });
  const [error, setError] = useState({ errorRefresh: false, output: "" });

  // We force the user to wait since a refresh token was found so we give out loading hints.
  const refreshWithHints = async () => {
    console.log("Actively refreshing ...");
    try {
      const resData = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: getRefreshMutation()
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

      //We got a valid token, user can now have access to UI
      //No more UI loading hint, only silent refreshes from here on out
      setNewExpirationDate();
      tokenCache.token = resData.data.refreshJwtAuthToken[AUTH_TOKEN];
      silentlyRefresh();
      setSuccess({
        successRefresh: true,
        token: resData.data.refreshJwtAuthToken[AUTH_TOKEN]
      });
    } catch (err) {
      console.log("[useRefreshToken] [refreshWithHints]: error!", err);
      //Maybe invalid refresh token. Redirect to login
      cleanupLocalStorage();
      setError({ ...error, errorRefresh: true, output: err });
    }
  };

  useEffect(() => {
    if (success.successRefresh || error.errorRefresh) {
      setLoading({ ...loading, loadingRefresh: false });
    }
  }, [success, error]);

  const startRefresh = () => {
    refreshWithHints();
    setLoading({ loadingRefresh: true, called: true });
  };

  return [startRefresh, loading, success, error];
};

const setNewExpirationDate = () => {
  //set the new expiry date as 4.5 minutes from now IN SECONDS since epoch time
  localStorage.setItem(
    JWT_AUTH_EXPIRATION,
    new Date(
      //date now in milliseconds since epoch time + 4.5 minutes in ms
      new Date().getTime() + 270000
    ).getTime() / 1000
  ); // converted to seconds since epoch time)
};

// A refresh without loading and error hints, simply for background task.
// We DON'T interfere with the UX
const backgroundRefresh = async () => {
  console.log("Refreshing in the background ...");
  try {
    const resData = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: getRefreshMutation()
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    });
    //We got a valid token, user can now have access UI
    //No more UI loading hint, only silent refreshes from here on out
    setNewExpirationDate();
    console.log("[backgroundRefresh]: Done!", resData);
    tokenCache.token = resData.data.refreshJwtAuthToken[AUTH_TOKEN];
    silentlyRefresh();
  } catch (err) {
    console.log("[backgroundRefresh]: Error!", err);
    tokenCache.token = null;
    cleanupLocalStorage();
  }
};

let timerId;
let delay;
const silentlyRefresh = () => {
  console.log(
    `Silently refreshing in: [${new Date(
      localStorage.getItem(JWT_AUTH_EXPIRATION) * 1000
    )}]`
  );
  //we expect the date to be stored as seconds since epoch time
  //since settimeout talks in milliseconds, we get the remaining milliseconds (hence multiplying to 1000)
  //expiration date in ms since epoch - Date now in ms since epoch = remaining milliseconds
  delay =
    new Date(localStorage.getItem(JWT_AUTH_EXPIRATION) * 1000) -
    new Date().getTime();

  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(backgroundRefresh, delay);
};

export const cleanupLocalStorage = () => {
  //!Do not delete
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(JWT_AUTH_EXPIRATION);
  console.log("[cleanupLocalStorage]: Done!", [
    REFRESH_TOKEN,
    JWT_AUTH_EXPIRATION
  ]);
  //Your code below
  localStorage.removeItem(USER_ID);
};

const setupLocalStorage = data => {
  console.log("Setting up localstorage ... ", [data]);
  //!Do not delete
  localStorage.setItem(REFRESH_TOKEN, data.login[REFRESH_TOKEN]);
  localStorage.setItem(
    JWT_AUTH_EXPIRATION,
    data.login.user[JWT_AUTH_EXPIRATION]
  );
  console.log("[setupLocalStorage]: Done!", [
    REFRESH_TOKEN,
    JWT_AUTH_EXPIRATION
  ]);
  //Your code below
  localStorage.setItem(USER_ID, data.login.user[USER_ID]);
  console.log("[setupLocalStorage]: Additional setup:", USER_ID);
};
