import { tokenCache } from "../hooks/authentication";

import loadable from "@loadable/component";

//Lazy load all components except the component for root or home
const AsyncAccount = loadable(() => import("../../core/Account/Account"));
const AsyncLogout = loadable(() => import("../../core/Logout/Logout"));
const AsyncDirectory = loadable(() => import("../../core/Directory/Directory"));
const AsyncGraphiQL = loadable(() =>
  import("../../core/GraphiQlWrap/GraphiQlWrap")
);
import Home from "../../core/Home/Home";
import Login from "../../core/Login/Login";
import Register from "../../core/Register/Register";

/**
 * How to use:
 * Adding a menu here automatically adds them to our RoutesList component
 * These objects are simply mapped to a <Route/> component
 * You can pass them to a <Menu linklist={}/> component knowing that the routes are taken care of.
 */

//!Do not delete. This serves as a fallback linklist
export const defaultLinkList = [
  {
    path: "/",
    exact: true,
    component: Home,
    label: ""
  },
  {
    path: "/logout",
    exact: true,
    component: AsyncLogout,
    label: "Logout"
  },
  {
    path: "/directory",
    exact: true,
    component: AsyncDirectory,
    label: "Directory"
  },
  {
    path: "/account",
    exact: true,
    component: AsyncAccount,
    label: "My Account"
  }
];

export const authLinkList = [
  {
    path: "/directory",
    exact: true,
    component: AsyncDirectory,
    label: "Directory"
  },
  {
    path: "/logout",
    exact: true,
    component: AsyncLogout,
    label: "Logout"
  },
  {
    path: "/account",
    exact: true,
    component: AsyncAccount,
    label: "My Account",
    nest: [
      {
        path: "/account/edit",
        exact: true,
        component: AsyncAccount,
        label: "Edit Account"
      }
    ]
  }
];

export const unAuthLinkList = [
  {
    path: "/login",
    exact: true,
    component: Login,
    label: "Login"
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    label: "Register"
  },
  {
    path: "/directory",
    exact: true,
    component: AsyncDirectory,
    label: "Directory"
  }
];

export const profLinkList = [
  {
    path: "/account",
    exact: true,
    component: AsyncAccount,
    label: "My Account",
    nest: [
      {
        path: "/account/edit",
        exact: true,
        component: AsyncAccount,
        label: "Edit Account"
      }
    ]
  }
];

export const list = [defaultLinkList, authLinkList, unAuthLinkList];

if (process.env.NODE_ENV === "development") {
  list.forEach(li => {
    li.push({
      path: "/__graphiql",
      exact: true,
      component: AsyncGraphiQL,
      label: "GraphiQlIDE"
    });
  });
}
