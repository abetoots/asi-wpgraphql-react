import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Routing
import { BrowserRouter } from "react-router-dom";

//Redux
import { connect } from "react-redux";

//Components
import RoutesList from "./core/RoutesList/RoutesList";
import BoundaryUI from "./hoc/BoundaryUI/BoundaryUI";

//Misc
import { list } from "./misc/shared/link-list";
import { uniqueRoutes } from "./misc/shared/helper-funcs";
import { useRefreshToken } from "./misc/hooks/authentication";
import { REFRESH_TOKEN } from "./misc/shared/constants";
import * as actions from "./misc/store/actions/index";

const App = props => {
  const routes = uniqueRoutes(list.flat());
  const [mounted, setMounted] = useState(false);

  const [
    startRefresh,
    { loadingRefresh },
    { successRefresh, token }
  ] = useRefreshToken();

  useEffect(() => {
    //if we found a refresh token
    if (successRefresh) {
      props.authSuccess(token);
    }
  }, [successRefresh]);

  //ComponentDidMount
  useEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN)) {
      startRefresh();
    }
    setMounted(true);
  }, []);

  return (
    <BrowserRouter>
      <BoundaryUI loading={loadingRefresh}>
        {mounted ? <RoutesList routes={routes} /> : ""}
      </BoundaryUI>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: user => dispatch(actions.authSuccess(user))
  };
};

App.propTypes = {
  authSuccess: PropTypes.func
};

export default connect(null, mapDispatchToProps)(App);
