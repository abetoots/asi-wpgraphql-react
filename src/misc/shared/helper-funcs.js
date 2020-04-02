import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

export const updateObject = (oldState, newProperties) => {
  return {
    ...oldState,
    ...newProperties
  };
};

/**
 * Ensures that all values from a given array are unique
 * @returns An array containing the unique values
 * @param {Array} array
 */
export const uniqueRoutes = array => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach(itm => {
    if (itm.nest && Array.isArray(itm.nest)) {
      itm.nest.forEach(nestedItm => {
        if (!s.has(nestedItm.path)) {
          s.add(nestedItm.path);
          a.push(nestedItm);
        }
      });
    }
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm.path)) {
      s.add(itm.path);
      a.push(itm);
    }
  });

  return a;
};

export const uniqArray = array => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach(itm => {
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm)) {
      s.add(itm);
      a.push(itm);
    }
  });

  return a;
};

export const isFile = x =>
  x &&
  (Object.prototype.toString.call(x) === "[object File]" || x instanceof File);

export const isDate = x =>
  x &&
  (Object.prototype.toString.call(x) === "[object Date]" || x instanceof Date);

export const isFunction = x =>
  x &&
  (Object.prototype.toString.call(x) === "[object Function]" ||
    "function" === typeof x ||
    x instanceof Function);

// this is a handy function for any component we need to test
// that relies on the router being in context
export const renderWithRouter = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};
