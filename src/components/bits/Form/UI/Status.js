import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  root: {
    padding: "15px",
  },
});

const Status = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const ariaLabel = ["form status"];

  if (props.success && props.onSuccess) {
    ariaLabel.push("success");
    return (
      <div className={classes.root} aria-label={ariaLabel.join(" ")}>
        {props.children}
      </div>
    );
  }

  if (props.error && props.onError) {
    ariaLabel.push("error");
    return (
      <div className={classes.root} aria-label={ariaLabel.join(" ")}>
        {props.children}
      </div>
    );
  }

  return <></>;
};

Status.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  success: PropTypes.bool,
  onError: PropTypes.bool,
  onSuccess: PropTypes.bool,
};

export default Status;
