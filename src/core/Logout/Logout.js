import React, { useEffect } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//Components
import BoundaryRedirect from "@Hoc/BoundaryRedirect/BoundaryRedirect";

//Misc
import * as actions from "@Store/actions/index";

const Logout = props => {
  useEffect(() => {
    props.logOut();
  }, []);
  return <BoundaryRedirect if={!props.authenticated} ifTrueTo="/login" />;
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.logOut())
  };
};

Logout.propTypes = {
  authenticated: PropTypes.bool,
  logOut: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
